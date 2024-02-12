import React, { ChangeEvent, useState } from 'react';
import { useConnect, useAccount, shortenAddress, useDisconnect } from "@puzzlehq/sdk";
import Link from 'next/link';
import { useProgram } from '../../context/ProgramContext';

const MegaMenu = () => {
  const { programName, setProgramName, setFunctionNames, setMintFunctions, setPrivateFunctions, setPublicFunctions } = useProgram();
  const [loaded, setLoaded] = useState(false);

  const { account } = useAccount();
  const { loading, connect } = useConnect();
  const { disconnect } = useDisconnect();

  console.log(account)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProgramName(event.target.value);
  };

  const setFunctions = () => {
    setLoaded(true);
    fetch(`https://explorer.hamp.app/testnet3/program/${programName}`)
      .then(response => response.text())
      .then(data => {
        const functionNames = data.match(/function\s+\w+/g)?.map(fn => fn.split(' ')[1]) || [];
        const mintFunctions = functionNames.filter(name => name.includes('mint'));
        const privateFunctions = functionNames.filter(name => 
          !name.includes('mint') && 
          (name.includes('private') && (!name.includes('public') || name.indexOf('private') < name.indexOf('public')))
        );
        const publicFunctions = functionNames.filter(name => 
          !name.includes('mint') && 
          (name.includes('public') && (!name.includes('private') || name.indexOf('public') < name.indexOf('private')))
        );
        setFunctionNames(functionNames)
        setMintFunctions(mintFunctions);
        setPrivateFunctions(privateFunctions);
        setPublicFunctions(publicFunctions);
        console.log(mintFunctions,publicFunctions,privateFunctions)
      })
      .catch(error => console.error('Error:', error))
      .finally(() => setLoaded(false));
  };

  return (
    <nav className="relative bg-white border-b-2 border-gray-300 text-gray-900">
      <div className="container mx-auto flex justify-between">
        <div className="relative block p-4 lg:p-6 text-xl text-blue-600 font-bold">Token Workshop</div>
        <div className="flex items-center gap-1">
          <input
            type="text"
            placeholder="Program Id (.aleo)"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={programName}
            onChange={handleInputChange}
          />
         {/*<button type="button" class=>Default</button>*/}
         <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 whitespace-nowrap" onClick={setFunctions} disabled={loading}>
            {loaded ? 'Loading...' : 'Set Program'}
          </button>
        </div>
        <ul className="flex">
          <li className="hover:bg-blue-800 hover:text-white">
            <Link href="/" className="relative block py-6 px-2 lg:p-6 text-sm lg:text-base font-bold nav-link">Mint</Link>
          </li>
          <li className="toggleable hover:bg-blue-800 hover:text-white">
            <Link href="/private" className="block cursor-pointer py-6 px-4 lg:p-6 text-sm lg:text-base font-bold nav-link">Private</Link>
          </li>
          <li className="hoverable hover:bg-blue-800 hover:text-white">
            <Link href="/public" className="relative block py-6 px-4 lg:p-6 text-sm lg:text-base font-bold hover:bg-blue-800 hover:text-white nav-link">Public</Link>
          </li>
          <div className='mt-3 ml-2'>
          <button
            className="flex items-center rounded-[5px] relative text-sm font-body transition-all focus:outline-none focus:ring-0 focus-visible::outline-none focus-visible:ring focus-visible:ring-focus hover:-translate-y-0.5 active:translate-y-0 tracking-[0.029em] bg-yellow-900 hover:bg-[rgba(56,47,25)] active:border-[rgba(56,47,25)] border-2 border-solid border-secondary text-secondary box-border disabled:opacity-30 font-semibold h-10 px-5 py-2 text-md"
            onClick={() => account ? disconnect() : connect()}
            color="yellow"
            disabled={loading}
          >
            {account ? shortenAddress(account.address) : (loading ? "Loading..." : "Connect Puzzle")}
          </button>

          </div>
        </ul>
      </div>
    </nav>
  );
};

export default MegaMenu;
