---
id: web-footprint
name: Website Footprinting
description: Using online tools as a starting point in assessing the auditee web application is a good way to expand online...
origin: https://github.com/SAFETAG/SAFETAG
origin_path: master/en/exercises/web_footprint/variant_cms_version.md
authors: SAFETAG
org_size_under: 1000
remote_options: Complete
skills_required: Website scanning
time_required_minutes: 60
approach: Technical, Research
---
# Website Footprinting

## Summary

Using online tools as a starting point in assessing the auditee web application is a good way to expand online reconnaisance as well as start your vulnerability assessment. You can build a profile and a good understanding of the web application by identifying what comprises the web application and technologies behind. From there you can start your next move by putting together different strategies on conducting your vulnerability assessment.

For example, after discovering accessable web directories, you can then start looking for forgotten or abandoned files and applications that might contain sensitive information like (Passwords) or an outdated and vulnerable applications.  Content management systems, while powerful, require ongoing maintenance and updates to stay secure. Quite often these (or specific plugins) fall out of date and become increasingly vulnerable to automated as well as targeted attacks.

Online tools offer ways of performing "passive" scans, in which your identity is hidden from the target organization, in cases where there are IDS/IPS, firewalls deployed. These should be used in conjuction with other outputs from reconnaisance to determine platforms and hosts which are out of scope.




## Walkthrough

Before unleashing more advanced and powerful tools like OpenVAS, a few quick steps can help better guide your work. As a general note, surfing using a browser with at least [NoScript](https://addons.mozilla.org/en-US/firefox/addon/noscript/) enabled may help not only protect you, but may also help to reveal malware or adware infecting the websites.

Record core details about the website - determine the hosting provider, platform, Content Management Systems, and other baseline data.  [BuiltWith](http://builtwith.com/) is a great tool.  There are a few alternatives, including an open source tool, [SiteLab](https://callmeed.github.io/site-lab/).  *Note that BuiltWith is a tool bundled in recon-ng, but the output it provides is not currently stored in its data structures.* These tools may also reveal plugins, javascript libraries, and DDoS protection systems like CloudFlare.

**Tools**

- [BuiltWith](https://builtwith.com)
- [Online Pentesting Tools](https://pentest-tools.com/)
- [Hacker Target](https://hackertarget.com/)

___

###### CMS Version Detection

:[](variant_cms_version.md)

___

## Recommendation

Most popular CMS platforms provide emailed alerts and semi-automated ways to update their software. Make sure someone responsible for the website is either receiving these emails or checking regularly for available updates. Security updates should be applied immediately. It is a best practice however to have a “test” site where you can first deploy any CMS update before attempting it on a production site.

For custom CMS systems, it is strongly advisable to migrate to a more standard, open source system.

An increasingly good practice is for organizations to take advantage of the "free" tiers of DDoS mitigation services, of which [CloudFlare](https://www.cloudflare.com/) is probably the best known. A challenge of these free services can be that they have definite limits to their protection. With CloudFlare, organizations can request to be a part of their [Project Galileo](https://www.cloudflare.com/galileo) program to support at-risk sites even beyond their normal scope of support.

A community-based, open source alternative is [Deflect](https://deflect.ca/), which is completely free for eligible sites.

Some of these services will be revealed by BuiltWith, but checking the HTTP Response Headers (in Chromium/Chrome, available under the Inspect Element tool, or by using [Firebug](https://addons.mozilla.org/en-US/firefox/addon/firebug/) in Firefox. See [Deflect's wiki](https://wiki.deflect.ca/wiki/About_Deflect#Is_it_working.3F) for more information.

Guide for NGOs about DDoS: [Digital First Aid Kit](https://rarenet.github.io/DFAK/en/DDoSMitigation/)





:[](../references/footnotes.md)
