#Double Authorization User Flows

###Background
Automatically updating ORCID records with new publication metadata typically requires users to grant 2 separate organizations permission to access their record (the publisher and the DOI registration agency).

Currently, these 2 permission requests happen at different times, and in different systems:

- **Publisher:** during manuscript submission, from within the submission system
- **DOI registration agency:** after DOI is minted, via ORCID inbox notifications 

This process has gained moderate user uptake, but there may be opportunity to increase uptake by supporting additional permission workflows. 

One possibility involves presenting users with permission requests from both systems during manuscript submission, so that no further interaction is needed in order to update the user's ORCID record. 

###User workflows

The cases below show variations on this "double authorization" flow (from the user perspective), using Publisher Pals and DOI Dudes to represent the publisher and DOI registration agency systems. 

[Case 1: Neither app has existing permission (with Publisher Pals redirect screen)](case_01.md)
[Case 2: Neither app has existing permission (without Publisher Pals redirect screen)](case_02.md)
[Case 3: DOI Dudes already has permission (with Publisher Pals redirect screen)](case_03.md)
[Case 4: DOI Dudes already has permission (without Publisher Pals redirect screen)](case_04.md)
[Case 5: Neither app has existing permission (separate buttons)](case_05.md)

###Demo application
Run a live demo of Case 1 on your own machine! Get the code at https://github.com/ORCID/double-orcid-auth-node


