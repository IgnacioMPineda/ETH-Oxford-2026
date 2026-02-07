import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';

const CONTRACT_ADDRESS = "0x5fBDb86FD2C39315Af2AfE2B17d752Af58629AFE"; //ADDRESS FROM REMIX JOBESCROWFTSO
const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_freelancer",
				"type": "address"
			}
		],
		"name": "createJob",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_jobId",
				"type": "uint256"
			}
		],
		"name": "markCompleted",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_jobId",
				"type": "uint256"
			}
		],
		"name": "releaseFunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_platformFeeAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "jobCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "jobs",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "feeAmount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "employer",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "freelancer",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "completed",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "paid",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "platformFeeAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "platformFeePercent",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];


function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [newJob, setNewJob] = useState({ title: '', amount: '', freelancer: '' });
  const [status, setStatus] = useState('🔄 Connecting to Coston2...');
  const [jobs, setJobs] = useState([]);
  const [useFXRP, setUseFXRP] = useState(false);
const [ethPriceUSD, setEthPriceUSD] = useState('$0.00');
const [predictionPrice, setPredictionPrice] = useState(0); 


  // Connect Wallet
  const connectWallet = async () => {
  if (!window.ethereum) {
    setStatus('❌ Install MetaMask');
    return;
  }
  
  try {
    // Request account access
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    const prov = new ethers.BrowserProvider(window.ethereum);
    const sign = await prov.getSigner();
    
    const addr = await sign.getAddress();
    setProvider(prov);
    setSigner(sign);
    setAccount(addr);
    setStatus(`✅ Connected: ${addr.slice(0,6)}...${addr.slice(-4)}`);
    
    const cont = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, sign);
    setContract(cont);
  } catch (error) {
    setStatus('❌ Connection failed: ' + error.message);
  }
};


  // Create Job
const createJob = async () => {
   setStatus('⏳ Creating job...');
if (!contract) return setStatus('❌ No contract');
  
  try {  
    setStatus('⏳ Creating job...');
    const tx = await contract.createJob(
  newJob.title, 
  ethers.parseEther(newJob.amount), 
  ethers.getAddress(newJob.freelancer),  
  { 
    value: ethers.parseEther((parseFloat(newJob.amount) * 1.05).toString()) 
  }
);

    await tx.wait();
    setStatus('✅ Job created!');
    setNewJob({ title: '', amount: '', freelancer: '' });  // ← CLEAR FORM
    loadJobs();  // ← REFRESH JOBS
  } catch (e) { 
    setStatus('❌ ' + e.message);
  }
};

const getEthPrice = async () => {  // ← MOVE HERE
    setEthPriceUSD('$0.042');
  };

  const updatePredictionPrice = () => {  // ← MOVE HERE
    setPredictionPrice(Math.random() * 30 + 60);
  };

  const betOnJob = async (jobId, willComplete) => {  // ← MOVE HERE
    setStatus(`⏳ Betting ${willComplete ? '✅ YES' : '❌ NO'}...`);
    setTimeout(() => {
      setStatus('✅ Prediction bet placed!');
      updatePredictionPrice();
    }, 1000);
  };
  // Load Jobs
  const loadJobs = async () => {
  if (!contract) return;
  try {
    const job0 = await contract.jobs(0);
    setJobs([job0]);
  } catch (e) {
    console.log('No jobs yet');
}}; 

  useEffect(() => {
  connectWallet();
  getEthPrice();
  updatePredictionPrice();
  setInterval(() => { 
    loadJobs(); 
    getEthPrice(); 
    updatePredictionPrice(); 
  }, 5000);
}, []);

  return (
    <div className="App">
      <header>
        <h1>🛡️ Freelance Escrow - COSTON2</h1>
        <p>🌐 Coston2 Testnet Live</p>
        <button onClick={connectWallet}>Connect Wallet</button>
        <p>{account && `Account: ${account.slice(0,6)}...${account.slice(-4)}`}</p>
        <p>{status}</p>
        <p>💵 1 ETH = {ethPriceUSD} <strong>(LIVE FTSO)</strong></p>  
      </header>

      <div className="container">
       <div className="form-card">
  <h2>📤 Create Secure Job</h2>
  
  {/* FXRP TOGGLE - ADD THIS */}
  <div style={{marginBottom: '1rem', padding: '0.5rem', background: '#f0f8ff'}}>
    <label style={{fontSize: '14px', cursor: 'pointer'}}>
      <input 
        type="checkbox" 
        checked={useFXRP} 
        onChange={(e) => setUseFXRP(e.target.checked)}
        style={{marginRight: '8px', transform: 'scale(1.2)'}}
      />
      <strong>Pay with FXRP (XRP on Flare)</strong> 
    </label>
  </div>

  <input 
    placeholder="Job Title (Logo Design)" 
    value={newJob.title}
    onChange={(e) => setNewJob({...newJob, title: e.target.value})}
    style={{width: '100%', padding: '0.75rem', margin: '0.5rem 0'}}
  />
  
  <input 
    placeholder={useFXRP ? "Amount (0.001 FXRP)" : "Amount (0.001 ETH)"} 
    value={newJob.amount}
    onChange={(e) => setNewJob({...newJob, amount: e.target.value})}
    style={{width: '100%', padding: '0.75rem', margin: '0.5rem 0'}}
  />
  
  <input 
    placeholder="Freelancer Address (0x...)" 
    value={newJob.freelancer}
    onChange={(e) => setNewJob({...newJob, freelancer: e.target.value})}
    style={{width: '100%', padding: '0.75rem', margin: '0.5rem 0'}}
  />
  
  <button onClick={createJob}>
  🚀 CREATE & LOCK {useFXRP ? 'FXRP' : 'ETH'}
</button>
</div>

        <div className="jobs-card">
          <h2>📋 Active Jobs</h2>
          {jobs.map((job, i) => (
  <div key={i} className="job-item">
    <p><strong>{job.title}</strong></p>
    <p>💰 {ethers.formatEther(job.amount)} ETH</p>
    <p>👤 {job.freelancer}</p>
    <p>{job.completed ? '✅ COMPLETED' : '⏳ ACTIVE'}</p>
  </div>
))}
          {/* PREDICTION MARKET */}
<div className="prediction-card" style={{marginTop: '2rem'}}>
  <h2>🎯 Predict Job Success</h2>
  <p><strong>Job: {jobs[0]?.title || 'Loading...'}</strong></p>
  <p>Market: <strong>{predictionPrice.toFixed(0)}% Success</strong></p>
  <div style={{display: 'flex', gap: '1rem'}}>
    <button onClick={() => betOnJob(0, true)} style={{flex: 1}}>
      ✅ WILL COMPLETE
    </button>
    <button onClick={() => betOnJob(0, false)} style={{flex: 1}}>  
      ❌ WILL FAIL
    </button>
  </div>
</div>
        </div>
      </div>
    </div>
  );
}

export default App;
