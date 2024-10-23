import React from 'react';
// import Header from '../components/Header';
import Image from 'next/image';
// import CartBody from '../components/CartBody';
import dynamic from 'next/dynamic';

const Header = dynamic(()=> import('../components/Header'))
// const CartBody = dynamic(()=> import('../components/CartBody'))
const cart = () => {

// very Important vvip
const CartBody = dynamic(()=> import('../components/CartBody'),{
  loading: () => <div className=''><div className="flex justify-center items-center h-screen">
         
  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#af8a26]"></div>
</div></div>,
})


  return (
    <>
      <Header />
      <CartBody/>
    </>
  )


}

export default cart;
