# ETH-Oxford-2026
Lancelot is a crypto-native freelancing platform that replaces trust and manual arbitration with on-chain escrow logic.

Each job is a smart-contract–enforced escrow deployed on Flare’s Coston2 testnet. When a client creates a job, they lock the full payment amount plus a platform fee directly into the contract. Funds are non-custodial and cannot be withdrawn unilaterally.

The job lifecycle follows the following sequence:
  - The employer defines a job title and secudes a fund on a blockchain network.
  - Free lancer completes the work off-chain.
  - If the job is marked as complete, according to some predetermined rules, the funds are releasea automatically and enter the          freellancer's account.

No party can block the other without financial consequences and the payments is guaranteed if cerain conditions are met.

Authentication and onboarding are abstracted using Privy, allowing users to login using their email accounts but still using their embedded wallet.

Flare's infrastructure is used to enhance security and transparency:
  - Live price data is displayed using FTSO feeds
  - Jobs and payments are executed on Flare-compatible EVM smart contracts, ensuring deterministic execution and public      verifiability.

Additionally, there will be a layer associated to a client's / freelancer's history, in order to determine their reliability for conducting business:
  - Ratio of successes against non-successes.
  - A prediction market allows third parties to bet on whether a job will be successfully completed, generating a real-time   probability of success. This creates an external, incentive-aligned signal of reliability that cannot be faked by either party
