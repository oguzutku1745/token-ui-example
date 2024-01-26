import { WalletMultiButton } from '@demox-labs/aleo-wallet-adapter-reactui';
import React from 'react';
import Link from 'next/link'

const MegaMenu = () => {
  return (
    <nav className="relative bg-white border-b-2 border-gray-300 text-gray-900">
      <div className="container mx-auto flex justify-between">
        <div className="relative block p-4 lg:p-6 text-xl text-blue-600 font-bold">Token Workshop</div>
        <ul className="flex">
          <li className="hover:bg-blue-800 hover:text-white">
            <Link href="/" className="relative block py-6 px-2 lg:p-6 text-sm lg:text-base font-bold">Mint</Link>
          </li>
          <li className="toggleable hover:bg-blue-800 hover:text-white">
            <Link href="/private" className="block cursor-pointer py-6 px-4 lg:p-6 text-sm lg:text-base font-bold">Private</Link>
          </li>
          <li className="hoverable hover:bg-blue-800 hover:text-white">
            <Link href="/public" className="relative block py-6 px-4 lg:p-6 text-sm lg:text-base font-bold hover:bg-blue-800 hover:text-white">Public</Link>
          </li>
          <div className='mt-2.5 ml-2'>
            <WalletMultiButton />
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default MegaMenu;
