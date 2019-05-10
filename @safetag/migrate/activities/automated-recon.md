---
id: automated-recon
name: Automated Reconnaisance
description: This component allows the auditor to quickly identify publicly available resources (such as websites, extranets, email...
origin: https://github.com/SAFETAG/SAFETAG
origin_path: master/en/exercises/automated_recon/variant_recon-ng.md
authors: SAFETAG
org_size_under: 1000
remote_options: Complete
skills_required: OSINT Tools
time_required_minutes: 240
approach: Technical
---
# Automated Reconnaisance

## Summary

This component allows the auditor to quickly identify publicly available resources (such as websites, extranets, email servers, but also social media information) connected to the organization and remotely gather information about those resources.



## Operational Security

  * Use VPNs to do automated searching. The automated process can be misconstrued by various services as malicious and cause your local network to get blocked, filtered, or surveilled. Tor is often blocked by the tools you will be using.
 

## Walkthrough

Both Recon-ng and Foca are open source reconnaissance tools with many available plugins. Foca is, out-of-the-box, more aimed at extracting metadata from documents and images, whereas Recon is slightly more focused on finding digging into domains, subdomains, contacts, and the more network-level information.  Both tools are best used in addition to critical thinking and manual exploration, and require "seed" inputs to get started and careful curation to remove false leads.

___

###### Recon-ng

:[](variant_recon-ng.md)

___

###### Foca Analyzer

:[](variant_foca_analyzer.md)

___

###### Maltego

:[](variant_maltego.md)



## Outputs

  * Dossier of organizational, partner, and beneficiary "open sources" information exposed online.
    * A list of e-mail address for members of the organization.
  * Identification and mapping of externally facing services and unintentionally exposed internal services.
    * Possible vulnerabilities in the websites and externally facing servers of the organization.
    * Existing information about earlier breaches identified in the paste-bin search.
  * Follow the proper incident response plan if high risk problems are identified.



:[](../references/footnotes.md)
