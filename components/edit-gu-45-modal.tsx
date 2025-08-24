'use client'

import React, { useState } from "react";
import { IoMdClose } from 'react-icons/io'
import { FaRegSave } from 'react-icons/fa'

type ModalEditFormProps = {
    setOpenEdit: (value: boolean) => void
}

const EditGU45Modal: React.FC<ModalEditFormProps> = ({ setOpenEdit }) => {
    const [isContainerChecked, setIsContainerChecked] = useState(true);

    return (
        <React.Fragment>
            <div className="fixed inset-0 bg-white/10 bg-opacity-10 backdrop-blur-xs z-40"
                onClick={() => setOpenEdit(false)}
            ></div>

            <div className=" w-[300px] md:w-[600px] lg:w-[800px] h-[400px] md:h-[565px]  overflow-y-scroll m-auto fixed inset-0 z-50 p-4 bg-white rounded-lg shadow-xl" >
                <div>
                    <p className=' text-center text-xl md:text-2xl'>Редактировать строки ГУ-45</p>
                    <hr className=" text-gray-300 my-3" />
                </div>
                <div className="w-full h-full"
                >
                    <form className="px-6 pt-6 pb-4">
                        <div>
                            <div className=' w-full flex flex-col md:flex-row justify-between items-center gap-5 mb-3'>
                                <div className=' w-full'>
                                    <label className=" text-sm" htmlFor="numberWagon">№ вагонов</label>
                                    <input className='w-full border p-1 md:px-2 md:py-1 lg:px-3 lg:py-2 rounded border-gray-300' type="number" id='numberWagon' />
                                </div>
                                <div className=' w-full'>
                                    <label className=" text-sm" htmlFor="codeWagon">Код вагона</label>
                                    <input className='w-full border p-1 md:px-2 md:py-1 lg:px-3 lg:py-2 rounded border-gray-300' type="number" id='codeWagon' />
                                </div>
                                <div className=' w-full'>
                                    <label className=" text-sm" htmlFor="wagonType">Род вагона</label>
                                    <select className=' w-full border p-1 md:px-2 md:py-1 lg:px-3 lg:py-2 rounded border-gray-300' name="wagonType" id="wagonType">
                                        <option value="">Специальные (цистерны, ...)</option>
                                        <option value="">...</option>
                                        <option value="">...</option>
                                        <option value="">...</option>
                                    </select>
                                </div>

                            </div>
                            <div className=' w-full flex flex-col md:flex-row justify-between items-center gap-5'>
                                <div className=' w-full'>
                                    <label className=" text-sm" htmlFor="ownershipWagon">Принадлежность вагона</label>
                                    <select className=' w-full border p-1 md:px-2 md:py-1 lg:px-3 lg:py-2 rounded border-gray-300' name="ownershipWagon" id="ownershipWagon">
                                        <option value="">СПС</option>
                                        <option value="">...</option>
                                        <option value="">...</option>
                                        <option value="">...</option>
                                    </select>
                                </div>
                                <div className=' w-full'>
                                    <label className=" text-sm" htmlFor="cargo">Выберите груз по ЕТСНГ</label>
                                    <input className='w-full border p-1 md:px-2 md:py-1 lg:px-3 lg:py-2 rounded border-gray-300' type="text" id='cargo' />
                                </div>
                            </div>
                        </div>
                        <div className=" grid grid-cols-1 md:grid-cols-2 items-end justify-between gap-5 my-3">
                            <div className=' w-full'>
                                <label className=" text-sm" htmlFor="containerNumber">Число и часы подачи</label>
                                <input className='w-full border p-1 md:px-2 md:py-1 lg:px-3 lg:py-2 rounded border-gray-300' type="date" name="containerNumber" id="containerNumber" />
                            </div>
                            <div className=' w-full'>
                                <label className=" text-sm" htmlFor="containerNumber">Число и часы окончания погрузки или выгрузки</label>
                                <input className='w-full border p-1 md:px-2 md:py-1 lg:px-3 lg:py-2 rounded border-gray-300' type="date" name="containerNumber" id="containerNumber" />
                            </div>
                            <div className=' w-full'>
                                <label className=" text-sm" htmlFor="containerNumber">Число и часы уборки вагонов</label>
                                <input className='w-full border p-1 md:px-2 md:py-1 lg:px-3 lg:py-2 rounded border-gray-300' type="date" name="containerNumber" id="containerNumber" />
                            </div>
                            <div className=' w-full'>
                                <label className=" text-sm" htmlFor="containerNumber">Число и часы подачи на терминал</label>
                                <input className='w-full border p-1 md:px-2 md:py-1 lg:px-3 lg:py-2 rounded border-gray-300' type="date" name="containerNumber" id="containerNumber" />
                            </div>
                            <div className=' w-full'>
                                <label className=" text-sm" htmlFor="note">Примечание</label>
                                <input className='w-full border p-1 md:px-2 md:py-1 lg:px-3 lg:py-2 rounded border-gray-300' type="text" id='note' />
                            </div>
                            <div className=' w-full'>
                                <label className=" text-sm" htmlFor="feesType">Тип сборов</label>
                                <select className=' w-full border p-1 md:px-2 md:py-1 lg:px-3 lg:py-2 rounded border-gray-300' name="feesType" id="feesType">
                                    <option value="">1-Подача и уборка</option>
                                    <option value="">...</option>
                                    <option value="">...</option>
                                    <option value="">...</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div className=" my-3 flex justify-start items-center">
                                <label className=" text-lg md:text-xl mr-3" htmlFor="containerCheck">Контейнер</label>
                                <input
                                    className="w-[15px] h-[15px] border p-1 md:px-2 md:py-1 lg:px-3 lg:py-2 rounded border-gray-300"
                                    type="checkbox"
                                    name="containerCheck"
                                    id="containerCheck"
                                    checked={isContainerChecked}
                                    onChange={(e) => setIsContainerChecked(e.target.checked)}
                                />
                            </div>
                            <div className=' grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-5'>
                                <div className=' w-full'>
                                    <label className=" text-sm" htmlFor="containerNumber">Номер контейнера</label>
                                    <input
                                        className={`w-full border p-1 md:px-2 md:py-1 lg:px-3 lg:py-2 rounded ${isContainerChecked ? 'border-gray-300' : 'bg-gray-100 border-gray-200 text-gray-500'
                                            }`}
                                        type="date" name="containerNumber" id="containerNumber"
                                        disabled={!isContainerChecked} />
                                </div>
                                <div className=' w-full'>
                                    <label className=" text-sm" htmlFor="containerType">Тип контейнера</label>
                                    <select
                                        className={`w-full border p-1 md:px-2 md:py-1 lg:px-3 lg:py-2 rounded ${isContainerChecked ? 'border-gray-300' : 'bg-gray-100 border-gray-200 text-gray-500'
                                            }`}
                                        name="containerType" id="containerType"
                                        disabled={!isContainerChecked}>
                                        <option value="">1-Подача и уборка</option>
                                        <option value="">...</option>
                                        <option value="">...</option>
                                        <option value="">...</option>
                                    </select>
                                </div>
                                <div className=' w-full'>
                                    <label className=" text-sm" htmlFor="documentName">Наименование документа</label>
                                    <input
                                        className={`w-full border p-1 md:px-2 md:py-1 lg:px-3 lg:py-2 rounded ${isContainerChecked ? 'border-gray-300' : 'bg-gray-100 border-gray-200 text-gray-500'
                                            }`}
                                        type="name" name="documentName" id="documentName"
                                        disabled={!isContainerChecked} />
                                </div>
                                <div className=' w-full'>
                                    <label className=" text-sm" htmlFor="documentNumber">Номер документа</label>
                                    <input
                                        className={`w-full border p-1 md:px-2 md:py-1 lg:px-3 lg:py-2 rounded ${isContainerChecked ? 'border-gray-300' : 'bg-gray-100 border-gray-200 text-gray-500'
                                            }`}
                                        type="name" name="documentNumber" id="documentNumber"
                                        disabled={!isContainerChecked} />
                                </div>
                                <div className=' w-full'>
                                    <label className=" text-sm" htmlFor="recipientName">Наименование Получатель</label>
                                    <input
                                        className={`w-full border p-1 md:px-2 md:py-1 lg:px-3 lg:py-2 rounded ${isContainerChecked ? 'border-gray-300' : 'bg-gray-100 border-gray-200 text-gray-500'
                                            }`}
                                        type="name" name="recipientName" id="recipientName"
                                        disabled={!isContainerChecked} />
                                </div>
                                <div className=' w-full'>
                                    <label className=" text-sm" htmlFor="senderName">Наименование Oтправитель</label>
                                    <input
                                        className={`w-full border p-1 md:px-2 md:py-1 lg:px-3 lg:py-2 rounded ${isContainerChecked ? 'border-gray-300' : 'bg-gray-100 border-gray-200 text-gray-500'
                                            }`}
                                        type="name" name="senderName" id="senderName"
                                        disabled={!isContainerChecked} />
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className=" flex justify-end space-x-3 py-5">
                        <button
                            onClick={() => setOpenEdit(false)}
                            className="cursor-pointer w-[130px] text-sm text-red-700 border-2 border-red-700 hover:bg-red-100 transition duration-500 font-semibold py-2 px-4 rounded-l  flex justify-center items-center gap-1">
                            <IoMdClose /> ЗАКРЫТЬ
                        </button>
                        <button
                            onClick={() => setOpenEdit(false)}
                            className="cursor-pointer w-[130px] text-sm text-green-700 border-2 border-green-700 hover:bg-green-100 transition duration-500 font-semibold py-2 px-4 rounded-r flex justify-center items-center gap-1">
                            <FaRegSave /> Сохранить
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default EditGU45Modal