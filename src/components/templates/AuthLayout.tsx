import React, { HTMLProps } from 'react';

interface LayoutProps extends HTMLProps<HTMLDivElement> {
    children?: React.ReactNode;
    title?: string;
}
const AuthLayout = ({ children, title }: LayoutProps) => {
    return (
        <div className="flex w-full h-screen bg-gradient-to-br from-teal-900 to-blue-900 justify-center items-center">
            <div className='flex w-2/5 bg-white rounded-2xl'>
                <div className='flex flex-row w-full p-5'>
                    <div className='flex flex-col w-full h-full'>
                        <h1 className='text-3xl font-bold mb-2 text-blue-600'>{title}</h1>
                        <p className='font-medium mb-8 text-slate-500'> Welcome, please enter your details </p>
                        {children}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AuthLayout
