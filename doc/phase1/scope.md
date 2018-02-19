# Scope
Our team is interested in learning more about system design, and we are focusing on building out the backend. The resulting system will account for fault-tolerance and easy deployments of services. We are including all ticket use cases, some GAPF application functionality, and no email update functionality in our product. The resulting product will help actors avoid referencing and using email.

#### P0 Goals
- Allow users to submit GAPF application info (excluding attachments).
- Allow budget director and grad office staff to view GAPF application status.
- Allow all actor interactions with tickets to change ticket state according to the - [specified use cases](https://docs.google.com/document/d/e/2PACX-1vRdfsGC_jykP4Z4tyqzFIFeB_pqnMDgi3MyGEfxtrQq3YMc6nCaC9Q-7-Crll_RBDU7PkZyfPMYywD0/pub).
- Allow users to add notes to tickets.
- Create a ticket dashboard which allows actors to see all tickets.

#### P1 Goals
- Use filter in the ticket dashboard based on features such as applicant country or state.
- Create a list that specifies "next-tasks" for actors.
- Add security using JWT tokens to incoming network requests.

#### P2 Goals
- Send email updates to actors for ticket state changes.
- Allow users to attach documents to their GAPF application.
- Add distributed tracing functionality to the backend services.
- Add urgent notifications through email for different actors
