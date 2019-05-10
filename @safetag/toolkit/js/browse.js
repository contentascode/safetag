$(document).ready(function() {
  // State for current audit plan
  // TODO: Serialize to localstorage.
  var audit = [];

  //if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
  var $L = 1200,
    $menu_navigation = $('#main-nav'),
    $cart_trigger = $('#cd-cart-trigger'),
    $hamburger_icon = $('#cd-hamburger-menu'),
    $lateral_cart = $('#cd-cart'),
    $shadow_layer = $('#cd-shadow-layer');

  /*
   * Faceted search component configuration
   */

  // nunjucks.configure('assets/templates', { autoescape: true });
  initFacets();

  var baseurl = $('body').data('baseurl');

  var tags,
    index,
    store = $.getJSON(baseurl + '/searchMeta.json'),
    data = $.getJSON(baseurl + '/searchIndex.json'),
    meta = {};
  res = {};

  data
    .then(function(data) {
      store.then(function(store) {
        tags = _.chain(store)
          .reduce(function(memo, val) {
            if (val.tags) memo.push(val.tags);
            return memo;
          }, [])
          .uniq()
          .value();

        meta = _.reduce(
          store,
          function(memo, val) {
            var cur = val;
            _.chain(val)
              .keys()
              .filter(function(v) {
                return (
                  cur[v] != '' &&
                  v != 'name' &&
                  v != 'id' &&
                  v != 'description' &&
                  v != 'keywords' &&
                  v != 'tags' &&
                  v != 'duration'
                );
              })
              .each(function(v, k, l) {
                if (!memo[v]) memo[v] = [];
                if (typeof cur[v] !== 'string') {
                  memo[v] = memo[v].concat(cur[v]);
                } else {
                  memo[v].push(cur[v]);
                }
              })
              .value();

            return memo;
          },
          []
        );

        console.log('meta', meta);

        _.chain(meta)
          .keys()
          .each(function(k) {
            meta[k] = _.uniq(meta[k]);
            if (k != 'content_type')
              _.each(meta[k], function(v) {
                $('#' + k + '_criteria').append(
                  '<div class="checkbox">' +
                    ' <label>' +
                    '    <input type="checkbox" id="' +
                    keyify(v) +
                    '" value="' +
                    v +
                    '">' +
                    '    <span>' +
                    v +
                    '</span>' +
                    '  </label>' +
                    '</div>'
                );
              });
          })
          .value();

        var ks = _.keys(store);
        var results = _.chain(ks)
          .filter(function(k) {
            return store[k].content_type == 'activity';
          })
          .map(function(k) {
            // add store key of object as path key of array object
            // pad missing keys.
            var ret = _.extend(
              { path: k.replace('.md', '.html') },
              _.mapValues(meta, function() {
                return '';
              }),
              store[k]
            );

            return ret;
          })
          .value();

        console.log('results', results);

        var FJS = FilterJS(
          results.map(function(res) {
            return Object.assign(res, { baseurl: baseurl });
          }),
          '#results',
          {
            template: '#result-template',
            search: { ele: '#searchbox' },
            //search: {ele: '#searchbox', fields: ['runtime']}, // With specific fields
            callbacks: {
              afterAddRecords: function(records) {
                $('#total_results').text(' (' + records.length + ')');

                _.chain(meta)
                  .keys()
                  .omit(
                    'library',
                    'data_modeling',
                    'bulk_upload',
                    'displays_lists',
                    'network_viz',
                    'network_editing',
                    'network_analysis',
                    'embeddable',
                    'document_viz',
                    'timelines',
                    'maps'
                  )
                  .each(function(k) {
                    var checkboxes = $('#' + k + '_criteria :input');
                    var qResult = JsonQuery(records);

                    checkboxes.each(function() {
                      var c = $(this);
                      var q = {};
                      q[k] = c.val();
                      var count = qResult.where(q).count;
                      c.next().text(c.val() + ' (' + count + ')');
                    });
                  })
                  .value();
              },
              afterFilter: function(result) {
                if (!result.length) {
                  $('#total_results').text(' (0)');
                } else {
                  $('#total_results').text(' (' + result.length + ')');
                }

                _.chain(meta)
                  .keys()
                  .omit(
                    'library',
                    'data_modeling',
                    'bulk_upload',
                    'displays_lists',
                    'network_viz',
                    'network_editing',
                    'network_analysis',
                    'embeddable',
                    'document_viz',
                    'timelines',
                    'maps'
                  )
                  .each(function(k) {
                    var checkboxes = $('#' + k + '_criteria :input');
                    var qResult = JsonQuery(result);

                    checkboxes.each(function() {
                      var c = $(this);
                      var q = {};
                      q[k] = c.val();
                      var count = qResult.where(q).count;
                      c.next().text(c.val() + ' (' + count + ')');
                    });
                  })
                  .value();
              }
            }
            //appendToContainer: appendToContainer
          }
        );

        FJS.addCriteria({ field: 'content_type', ele: '#content_type_criteria input:checkbox' });

        Object.keys(meta).forEach(function(k) {
          FJS.addCriteria({ field: k, ele: '#' + k + '_criteria input:checkbox' });
        });
      });
    })
    .then(function() {
      // Check if we are on a method page and grab its id.
      var method = keyify(window.location.href.replace(/^.*methods\/(.*)\.guide/, '$1'));
      var isHome = /@safetag\/toolkit\/?#?$/.test(window.location.href);
      // Display Planning button in navbar-link (but not in methods)
      if (isHome) {
        $('#cd-cart-trigger').removeClass('hidden');
        $('button.add-to-cart').removeClass('hidden');
      }

      $('#framework_criteria input#' + method).click();

      var productCustomization = $('.movie'),
        cart = $('.cd-cart'),
        animating = false;

      initCustomization(productCustomization);

      function initCustomization(items) {
        items.each(function(key, item) {
          var actual = $(this),
            addToCartBtn = actual.find('.add-to-cart'),
            data = actual.data('activity');
          //detect click on the add-to-cart button
          addToCartBtn.on('click', function() {
            if (!animating) {
              //animate if not already animating
              animating = true;

              addToCartBtn.addClass('is-added').find('path').eq(0).animate({
                //draw the check icon
                'stroke-dashoffset': 0
              }, 100, function() {
                setTimeout(function() {
                  addToCartBtn
                    .removeClass('is-added')
                    .find('span')
                    .on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
                      //wait for the end of the transition to reset the check icon
                      addToCartBtn.find('path').eq(0).css('stroke-dashoffset', '19.79');
                      animating = false;
                    });

                  if ($('.no-csstransitions').length > 0) {
                    // check if browser doesn't support css transitions
                    addToCartBtn.find('path').eq(0).css('stroke-dashoffset', '19.79');
                    animating = false;
                  }
                  updateCart(data);
                }, 600);
              });
            }
          });
        });
      }

      function updateCartCounter(count) {
        //show counter if this is the first item added to the cart
        !cart.hasClass('items-added') && cart.addClass('items-added');

        var cartItemsCount = cart.find('span');
        // console.log('count', count);
        if (count === 0) {
          cart.removeClass('items-added');
          $('#cd-cart .cd-cart-items').remove();
          $('#cd-cart .cd-cart-total').remove();
          $('a.export-btn').text('Add activities or select an Audit template');
          // Close plan pane when plan is empty.
          $('a.export-btn').off('click');
          $('a.export-btn').on('click', function(e) {
            close_panel();
          });
        } else {
          cartItemsCount.text(count);
        }
      }

      function updateCart(activity) {
        audit = audit.concat({ activity, variation: activity.variation || 0 });

        console.log('audit', audit);

        $('#cd-cart').html(renderPlan(audit));
        attachEvents();

        animating = false;
      }

      // View render
      function renderPlan(state) {
        return (
          '<ul class="cd-cart-items">' +
          state
            .map(function(item) {
              var duration =
                (item.activity.variations
                  ? item.activity.variations[item.variation].duration
                  : item.activity.duration) || '?';
              // console.log('duration', duration);
              return (
                '<li class="cd-single-item"><span class="cd-qty"><strong>' +
                item.activity.name +
                '</strong><div class="cd-price">' +
                duration +
                'h</div>' +
                (item.activity.variations
                  ? '<div class="cd-customization">' +
                    '    <select>' +
                    item.activity.variations
                      .map(function(variation, idx) {
                        return (
                          '<option value="' +
                          idx +
                          '" ' +
                          (idx === parseInt(item.variation) ? 'selected="selected"' : '') +
                          '>' +
                          variation.name +
                          '</option>'
                        );
                      })
                      .join('') +
                    '    </select>' +
                    '  </div> <!-- .cd-customization -->'
                  : '') +
                '<a class="cd-item-remove cd-img-replace" href="#">Remove</a></li>'
              );
            })
            .join('') +
          '</ul><div class="cd-cart-total"><p>Duration <span>' +
          state.reduce(function(sum, item) {
            // console.log('sum', sum);
            return (
              sum +
              (item.activity.variations
                ? item.activity.variations[item.variation].duration
                : item.activity.duration || 0)
            );
          }, 0) +
          'h</span></p></div><a class="export-btn" href="#">Export</a>' +
          '<div class="form-group hidden" id="export">' +
          '<label for="comment">Comment:</label>' +
          '<textarea class="form-control" rows="5" id="text">' +
          jsyaml.safeDump(audit, { noRefs: true }) +
          '</textarea>' +
          '</div>'
        );
      }

      function attachEvents() {
        var cartItemList = $('#cd-cart .cd-cart-items');

        $('a.export-btn').off();

        $('a.export-btn').on('click', function(e) {
          $('#export').toggleClass('hidden');
        });

        // console.log($('#cd-cart .cd-cart-items li'));
        updateCartCounter($('#cd-cart .cd-cart-items li.cd-single-item').length);

        //detect click on select elements
        $('.cd-customization select').on('change', function(event) {
          var index = $(this).parent().parent().parent('li').index();
          // console.log('$(this).parent(li)', $(this).parent().parent('li'));
          // console.log('index', index);
          // console.log('value', this.value);
          audit[index].variation = this.value;
          $('#cd-cart').html(renderPlan(audit));
          attachEvents();
        });

        var sortable = Sortable.create(cartItemList.get(0), {
          onEnd: function(/**Event*/ evt) {
            var tmp = audit[evt.newIndex];
            audit[evt.newIndex] = audit[evt.oldIndex];
            audit[evt.oldIndex] = tmp;
          }
        });

        cartItemList.on('click', 'li .cd-item-remove', function(e) {
          // console.log($(this).parent().parent('li'));
          var index = $(this).parent().parent('li').index();
          audit = audit.filter(function(val, key) {
            // console.log(`key ${key} / index ${index}`);
            return key != index;
          });
          $(this).parent().remove();
          // updateCartCounter($('#cd-cart .cd-cart-items li.cd-single-item').length);
          $('#cd-cart').html(renderPlan(audit));
          attachEvents();
        });
      }
    });
  /*
      data.then(function(data){
          // create index
          index = lunr.Index.load(data)
          store.then(function(store) {
            var array = $.map(store, function(value, index) {
                return [$.extend({},value, {ref: index})];
            });
            results_store = prepareResults(array,store)
            res = renderResults(results_store)
          });

          $('.search-results').empty().append( res.nb ?
            res.html : $('<p><strong>No results found</strong></p>')
          );

          $('.total-results').text(res.nb);

      });
  */

  $('body').on('click', function(event) {
    //if user clicks outside the .cd-gallery list items - remove the .hover class and close the open ul.size/ul.color list elements
    if ($(event.target).is('#cd-cart ul li.cd-single-item') || $(event.target).is('#cd-cart')) {
      deactivateCustomization();
    }
  });

  /*
   * Side bar selection component configuration
   */

  // Close plan pane when plan is empty.
  $('a.export-btn').on('click', function(e) {
    close_panel();
  });

  // Urgh... quick and dirty closure.
  function close_panel() {
    $shadow_layer.removeClass('is-visible');
    if ($lateral_cart.hasClass('speed-in')) {
      $lateral_cart
        .removeClass('speed-in')
        .on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
          $('body').removeClass('overflow-hidden');
        });
      $menu_navigation.removeClass('speed-in');
    } else {
      $menu_navigation
        .removeClass('speed-in')
        .on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
          $('body').removeClass('overflow-hidden');
        });
      $lateral_cart.removeClass('speed-in');
    }
  }

  //open lateral menu on mobile
  $hamburger_icon.on('click', function(event) {
    event.preventDefault();
    //close cart panel (if it's open)
    $lateral_cart.removeClass('speed-in');
    toggle_panel_visibility($menu_navigation, $shadow_layer, $('body'));
  });

  //open cart
  $cart_trigger.on('click', function(event) {
    event.preventDefault();
    //close lateral menu (if it's open)
    $menu_navigation.removeClass('speed-in');
    toggle_panel_visibility($lateral_cart, $shadow_layer, $('body'));
  });

  //close lateral cart or lateral menu
  $shadow_layer.on('click', function() {
    $shadow_layer.removeClass('is-visible');
    // firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
    if ($lateral_cart.hasClass('speed-in')) {
      $lateral_cart
        .removeClass('speed-in')
        .on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
          $('body').removeClass('overflow-hidden');
        });
      $menu_navigation.removeClass('speed-in');
    } else {
      $menu_navigation
        .removeClass('speed-in')
        .on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
          $('body').removeClass('overflow-hidden');
        });
      $lateral_cart.removeClass('speed-in');
    }
  });

  //move #main-navigation inside header on laptop
  //insert #main-navigation after header on mobile
  move_navigation($menu_navigation, $L);
  $(window).on('resize', function() {
    move_navigation($menu_navigation, $L);

    if ($(window).width() >= $L && $menu_navigation.hasClass('speed-in')) {
      $menu_navigation.removeClass('speed-in');
      $shadow_layer.removeClass('is-visible');
      $('body').removeClass('overflow-hidden');
    }
  });
});

function toggle_panel_visibility($lateral_panel, $background_layer, $body) {
  if ($lateral_panel.hasClass('speed-in')) {
    // firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
    $lateral_panel
      .removeClass('speed-in')
      .one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
        $body.removeClass('overflow-hidden');
      });
    $background_layer.removeClass('is-visible');
  } else {
    $lateral_panel
      .addClass('speed-in')
      .one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
        $body.addClass('overflow-hidden');
      });
    $background_layer.addClass('is-visible');
  }
}

function move_navigation($navigation, $MQ) {
  if ($(window).width() >= $MQ) {
    $navigation.detach();
    $navigation.appendTo('header');
  } else {
    $navigation.detach();
    $navigation.insertAfter('header');
  }
}

function prepareResults(results, store) {
  var results_store = results
    .map(function(result) {
      return $.extend({}, store[result.ref], { path: result.ref.replace('.md', '.html'), score: result.score });
    })
    .sort(function(a, b) {
      return b.score - a.score;
    });

  return results_store;
}

function renderResults(results) {
  return {
    results: results,
    html: nunjucks.render('results.html', { results: results }),
    nb: results.length
  };
}

function resetCustomization(selectOptions) {
  //close ul.clor/ul.size if they were left open and user is not interacting with them anymore
  //remove the .hover class from items if user is interacting with a different one
  selectOptions
    .siblings('[data-type="select"]')
    .removeClass('is-open')
    .end()
    .parents('.cd-single-item')
    .addClass('hover')
    .parent('li')
    .siblings('li')
    .find('.cd-single-item')
    .removeClass('hover')
    .end()
    .find('[data-type="select"]')
    .removeClass('is-open');
}

function deactivateCustomization() {
  $('#cd-cart').find('[data-type="select"]').removeClass('is-open');
}

function initFacets() {
  $('#content_type_criteria :checkbox').prop('checked', true);
  $('#content_type_audience').on('click', function() {
    $('#content_type_criteria :checkbox').prop('checked', $(this).is(':checked'));
  });
}

function keyify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '_') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-/g, '_') // Replace multiple - with single -
    .replace(/\-\-+/g, '_') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}
