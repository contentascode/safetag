---
id: suspicious-activity-analysis
name: Suspicious Activity Analysis
description: Malware is a common tactic to target organizations. Malware like a Remote Access Trojan (or RAT) can provide an...
origin: https://github.com/SAFETAG/SAFETAG
origin_path: master/en/exercises/suspicious_activity_analysis/variant_urls.md
authors: SAFETAG
org_size_under: 100
remote_options: None
skills_required: Malware Analysis
time_required_minutes: 120
approach: Technical
---
# Suspicious Activity Analysis

## Summary

Malware is a common tactic to target organizations. Malware like a Remote Access Trojan (or RAT) can provide an attacker with backdoor access to a targeted machine, enabling the attacker to steal information, record audio and video, as well as run commands on the infected machine.

To stop this from happening, you have to identify the malicious process within the system and stop it, or reformatting the machine in case you don’t feel spending time on stopping the malicious process.

It’s important to keep evidence, in case the auditee still has access to the original malicious software they received (e.g., an email, etc.), keep a copy of the file if you have the time and expertise to continue investigating or have the resources to submit it to other organizations working on analyzing such issues.

Scanning the possible infected machine or the original suspicious file with an anti-virus will save you time and effort, in the case such malware is already in its database. Scanning should always be the first step, preventing you from spending excess time if the machine was infected with a less serious piece of malware.

After determining the machine is infected, you can proceed in helping the staff member back up their information, scanning the files for malware, then reformatting the infected machine. Note, it is very difficult to clean an infected machine if you only have a short window of time.

In case the machine was infected, taking an image of the operating system will allow you to replicate the infected machine and run it after you finish your audit for a more in-depth investigation or send it to an expert to work on investigating the malware. Note, this also can be difficult in an audit setting where time is limited. Also see operational security considerations that come with replicating the files of a staff member of a sensitive organization. Be sure this is absolutely necessary and the staff members provides consent before completing.


## Materials Needed

* An Incident Response Plan agreed upon with the organization
* An emergency contact for the organization
* A Kali Virtual machine connected to the Internet
* A [Cuckoo Sandbox](https://cuckoosandbox.org/) installation (for later analysis post audit if you have the expertise)
* VPN
* USB drive(s)
* Large capacity External Hard disk, OS installation media and license keys

## Operational Security

* Consider the time you have, investigating malware can take days (you should not investigate during the audit itself)
* Confirm that the device belongs to the organization
* Make sure to take the device offline before start working on it
* Don’t transfer files from the infected machine to any other machines
* Use a USB drive to move files from the infected machine to your Audit machine for investigating proposes
* Study outputs for any obviously embarrassing personal information
* Don’t test anything on your virtual machine without VPN

## Walkthrough

*  In case they still have the original binaries (Attachment, email..etc.)

    1.  Download the file to your auditing machine, Scan the file via Anti-Virus or hash the file and use virustotal.com to search for it (Note, don’t upload the actual file to virus total as uploaded files are discoverable by paid subscribers in most cases)

    2.  Check the email’s header and see if it looks suspicious

*  In case there is no binaries (Attachment, email..etc.) or they have no access to it

    1.  Take the machine offline

    2.  In case you have time, Image the hard disk

    3.  Help the auditees to operate another machine to fill the gap of the suspicious machine

    4.  Run a non-depth scan for the machine and try to locate any suspicious files

    5.  Collect the suspicious files, hash them, then search for them on virustotal.com

    6.  Scan the open ports and monitor which applications is connected to external address


The next sections often are highly interrelated - a phishing email may include malicious URLs and/or files, network traffic may include URLs, URLs may try to send malicious file downloads.

**Questions to ask the user / organization**

* What suspicious behaviors are you witnessing?
* Where and when are you seeing this behavior? What makes you feel that the machine is somehow infected?
* Do you have an alternative to this machine/process/account you can use it until we clear things up?
* Did you receive any suspicious or unexpected email, attachment or different form of communication that made you feel this way?
* Do you still have access to the original email, attachment or any form of communication?

___

###### Phishing or Suspicious Emails

:[](variant_phishing.md)

___

###### Malicious Files

:[](variant_malicious_file.md)

___

###### Suspicious URLs

:[](variant_urls.md)

___

###### Suspicious Processes

:[](variant_suspicious_process.md)

___

###### Unusual Network Traffic

Advanced threats may be identified during the network scanning and traffic analysis. See the Network Scanning and Traffic Analysis activities.

___


###### Threat Hunting

:[](variant_threathunting.md)






:[](../references/footnotes.md)
