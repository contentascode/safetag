---
id: check-mail-server-vulns
name: Insecure Email Connections
description: A common issue with e-mail services is the lack of proper encryption. Staff should only be allowed to connect to the...
origin: https://github.com/SAFETAG/SAFETAG
origin_path: master/en/exercises/check_mail_server_vulns/summary.md
authors: SAFETAG
org_size_under: 1000
remote_options: with-support
skills_required: sslstrip, traffic monitoring
time_required_minutes: 30
approach: Technical
---
# Insecure Email Connections

## Summary

A common issue with e-mail services is the lack of proper encryption. Staff should only be allowed to connect to the organization’s mail server using SSL or TLS encryption. 

When a staff member sends or receives email an attacker with access to the same local network can easily and invisibly read, record, or modify all messages in-transit to and from the organization’s mail server.

Even an informed staff member who attempts to configure his email client to require SSL or TLS encryption will be unable to do so because the mail server does not support it.

The adversary could be someone, such as a patron of the Internet cafe where a staff member is working, who just happens to be using the same local network to connect to the Internet. Or, she could work for an organization with privileged access to the relevant network, such as %{organization}’s Internet Service Provider (ISP).

Even an informed staff member who attempts to configure his email client to require SSL or TLS encryption will be unable to do so because the mail server does not support it. For webmail, a staff member who attempts to enter the secure (“https://”;) alternative webmail address when logging in, might be unable to do so, because the Webmail application does not support it.




## Walkthrough

If the attacker wishes to observe the victim’s email traffic (most likely because they failed to capture an unencrypted password, which would have allowed them to log in as the victim and read their email directly), they may need to carry out a second, slightly more complex attack, which will also likely provide access to the victims password as well as the content of their email.

To capture outgoing (SMTP) messages, the process is nearly identical to the traffic monitoring exercise.

:[](../traffic_analysis/instructions.md)

In order to monitor incoming (POP3 or IMAP) messages, the attacker must use other techniques to ensure that responses to the victim actually pass through their machine before they arrive at their intended recipient. The most straightforward tool for this sort of thing is designed to attack Web traffic, but the same techniques works on POP3 and IMAP traffic. (This tool, SSLStrip, was written to facilitate more advanced testing of Web services that do implement encryption, but that do so incorrectly. In any case, it works fine for our purposes here.)

```
$ sslstrip -a -l 12345 -w sslstrip.log
```

The attacker then uses iptables to route a portion of the victim’s traffic (in this case, IMAP traffic destined for port 143) through the SSLStrip tool, which rewrites headers such that responses come to them first, before continuing along to the victim. The attacker then monitors the tool’s output for email messages:

```
$ iptables -t nat -A PREROUTING -p tcp --destination-port 143 –j REDIRECT --to-port 12345
$ tail -f sslstrip.log
```

(For POP3, the attacker would use port 110 instead of port 143, but the attack is otherwise identical.) At this point, the contents of the sslstrip.log file contains a copy of incoming IMAP traffic, including any email messages the victim might read while being observed.

This same technique, with minor modifications, would work to monitor incoming email messages downloaded through Webmail

## Recommendation

Mandatory (SSL, TLS or HTTPS) encryption on all authenticated services (especially email). This should apply to both direct connections to the email server (e.g. via IMAP, MAPI, SMTP) as well as webmail services.

Those who use Outlook, or some other email client, should only be allowed to connect to the organization’s mail server using SSL or TLS encryption. Attempts to connected without encryption should fail. All staff mail clients should be reconfigured accordingly.





:[](../references/footnotes.md)
