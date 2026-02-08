# ETH-Oxford-2026

The global freelance economy represents 1.8 billion workers generating $1.5 trillion annually, yet 40% of jobs end in payment disputes. Platforms like Upwork charge 20% fees while delivering zero payment guarantees—employers face chargebacks, freelancers face non-payment, and both lose time in endless arbitration. This trust crisis prevents the freelance market from scaling efficiently.

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


Lancelot Shield implements textbook DeFi principles: When employers create jobs, they lock ETH (plus a small platform fee) directly into a JobEscrow.sol smart contract deployed on Coston2. Funds become non-custodial, neither party can access them unilaterally. Every transaction lives on Flare's public blockchain. Payments flow employer → smart contract → freelancer via deterministic on-chain execution. ETH remains locked until Flare verification confirms work delivery. Smart contracts auto-release funds or refund employers based on predefined rules—no human discretion.

The prediction market layer creates an external reliability signal for every job. Third parties wager ETH on whether completion will occur, forming YES/NO liquidity pools that generate market-implied success probabilities. When jobs resolve via Flare verification, winning bets claim the opposing pool according to predefined smart contract rules. This mechanism produces objective trust scores driven by financial skin-in-the-game rather than manipulable platform ratings.

Built on Flare's Coston2 testnet, Lancelot Shield leverages FTSO price feeds for live ETH/USD prices, 1.5-second blocks for instant confirmations, and EVM compatibility for standard Remix/MetaMask tooling. 
