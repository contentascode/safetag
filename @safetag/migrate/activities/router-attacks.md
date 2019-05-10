---
id: router-attacks
name: Router Based Attacks
description: Many wireless routers still use the default password listed in [“Router Default Password...
origin: https://github.com/SAFETAG/SAFETAG
origin_path: master/en/exercises/router_attacks/summary.md
authors: SAFETAG
org_size_under: 100
remote_options: with-support
skills_required: Networking
time_required_minutes: 15
approach: Technical
---
# Router Based Attacks

## Summary

Many wireless routers still use the default password listed in [“Router Default Password Search”](http://www.routerpasswords.com/), meaning that anyone with access to the network could also take complete control of the router - adding in remote access tools or setting up other attacks.




## Walkthrough

##### Material that may be Useful:

  * *Search Engine:* [“Router Default Password Search”](http://www.routerpasswords.com/) (RouterPasswords.com)
  
  * *Framework:* [“Router Exploitation Framwork”](https://github.com/hackatom/routersploit)  

## Recommendation

**Change Default Router Passwords**

Passwords - particularly on core network devices - is very important.  Use a password manager to save the new password (or be prepared to reset the router to a factory default).

While nominally "inside the firewall" and protected from remote attacks, leaving routers with default passwords, particularly wireless routers whose networks are often shared with visitors, is a potentially very high risk for an organization.  Anyone who has gained access to the network via legitimate or other means could subtly alter the router's configuration to provide remote access, or route traffic to an attacker-designated server.  Such changes can easily go undetected for long periods of time.

A common fear is forgetting the new router password.  A password management system is an obvious solution, but if the router is in a secure location, even a stickie note would be better than the default password.





:[](../references/footnotes.md)
