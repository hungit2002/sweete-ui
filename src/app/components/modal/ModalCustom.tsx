import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface ModalCustomProps {
    show: boolean;
    onHide: () => void;
    title: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-4xl',
    xl: 'max-w-7xl'
};

export default function ModalCustom({
    show,
    onHide,
    title,
    children,
    size = 'md'
}: ModalCustomProps) {
    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [show]);

    if (!show) return null;

    return (
        <>
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-50" 
                onClick={onHide}
            />
            <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                bg-white rounded-lg shadow-xl z-50 w-[95%] ${sizeClasses[size]}`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <button 
                        onClick={onHide}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <FontAwesomeIcon icon={faXmark} size="lg" />
                    </button>
                </div>

                <div className="max-h-[calc(90vh-8rem)] overflow-y-auto">
                    {children}
                </div>
            </div>
        </>
    );
}