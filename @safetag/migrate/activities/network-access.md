---
id: network-access
name: Network Access
description: This activity helps auditors to test the strength of defenses the organizations' network has in place to protect their...
origin: https://github.com/SAFETAG/SAFETAG
origin_path: master/en/exercises/network_access/variant_wps_pin_cracking.md
authors: SAFETAG
org_size_under: 1000
remote_options: None
skills_required: password cracking, wireless network monitoring
time_required_minutes: 240
approach: Technical
---
# Network Access

## Summary

This activity helps auditors to test the strength of defenses the organizations' network has in place to protect their local area network. 
This component consists of gaining access to the local area network through a wireless access point and unsecured physical channels (such as an ethernet jack).



## Operational Security

*Note:* This section is one of the few sections where the SAFETAG audit does go through attack scenarios, from attempting to "break in" to the wireless network to testing exposed ethernet jacks for connectivity. 

The reasons for this are threefold.  First, access to an organization's internal network tends to reveal sensitive data and "shadow" infrastructures (such as dropbox usage) that lead to many recommendations to improve access control and discussions of the value of defense in depth.  Second, the specific act of breaking the wifi password allows for a discussion on password security without attacking any specific user's password. Finally, with wireless networks treated as equivalent to wired networks in many offices, reminding the organization that wireless networks extend beyond the physical walls of the office is useful in discussing password rotation and guest network policies.

Once you have access to the network, you need to first document how you managed that and share it with the hosts.  This is a great moment to discuss passwords in many cases.

  * Confirm that all devices you are accessing/scanning belong to the organization.
  * Clarify timing and seek permission with staff - some activities can tax the network or cause disruptions.

## Walkthrough

Breaking into network requires specialized tools as well as a significant amount of time in capturing authentication packets, and replaying those packets back to the wireless access point.

MAC filtering is a common, but easy to bypass security measure.

WEP (Wired Equivalent Privacy) has been found with several vulnerabilities. The RC4 algorithm that it uses to generate the keystream for encryption is subject to [two separate weaknesses](https://pdfs.semanticscholar.org/8aeb/2a27abc2a1d0a8b71047606fbeec0f711e03.pdf).

On the other hand, WPA/WPA2 (Wi-Fi Protected Access) is also found to be vulnerable to attack known as [KRACK](https://www.krackattacks.com/)(Key Reinstallation Attacks) as well as offline (high speed) attacks against the password itself. WPS, a common "feature" that is on by default on WPA networks, has significant vulnerabilities.

[WPA3](https://www.schneier.com/blog/archives/2018/07/wpa3.html), a new standard, is built to disallow offline password attacks, making it significantly harder to break in to that WPA2 networks. As it becomes available and devices support it, it should be a priority upgrade if wifi network security is a concern.

___

###### WEP Cracking
:[](variant_wep_cracking.md)

___

###### MAC Filtering Bypass

:[](variant_mac_filtering.md)

___

###### WPA Cracking

:[](variant_wpa_cracking.md)

___

###### WPS PIN Cracking

:[](variant_wps_pin_cracking.md)

## Recommendation

###### Recommendations for non-WPA networks
Transitioning to WPA networks with strong passwords, even for guest networks, is recommended.

MAC filtering and WEP provide no effective protection for a wifi network. Most wifi routers offer WPA encryption as an option, and if this is available it should be immediately implemented. Some older routers (and wifi devices) do not support WPA. It is highly recommended to upgrade immediately to hardware that supports WPA and to eliminate all WEP network access. Very few devices still functional do not support WPA2. As WPA3 becomes an option, upgrade to that.

###### Recommendations for WPA networks

WPS Pin entry should be disabled on the wireless router, or only enabled temporarily to add new devices to the network.

Choosing a strong WPA key is one of the most important steps toward defending an organization’s network perimeter from an adversary with the ability to spend some time in the vicinity of the offices. By extension, mitigating this vulnerability is critical to the protection of employees and partners (and confidential data) from the sort of persistent exposure that eventually brings down even the most well-secured information systems.

The WPA password should be long enough and complex enough to prevent both standard dictionary attacks and “brute-force attacks” in which clusters of powerful computers work in parallel to test every possible character combination. (We recommend 12 or more completely random characters or a passphrase that contains four or five—or more—relatively uncommon words.) The password should not contain common words, including number sequences, especially if they are related to the organization, its employees or its work.

A guest network, with no local network access and a distinct (possibly easier to communicate) password should be available if guests are ever given wifi access. Because passwords for guest networks inevitably end up being written on whiteboards, given to office visitors and emailed to partners, the guest password should also be changed periodically. This does not have to happen frequently, but anything less than three or four times per year may be unsafe.


## Outputs

  * Un-authorized access to the Wireless access point (WAP)
  * List of unused ethernet jacks with network connectivity.



:[](../references/footnotes.md)
