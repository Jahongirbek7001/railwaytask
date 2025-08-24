'use client'

import React, { useEffect, useState } from "react";
import { IoMdClose } from 'react-icons/io'
import { FaRegSave } from 'react-icons/fa'
import { supabase } from "@/lib/supabaseClient";


type ModalFormProps = {
    setOpen: (value: boolean) => void
    bolshoykuzov: boolean
    pereveska: boolean
    opredelenniyeperiodi: boolean
    plomba: boolean
    ochistka: boolean
    promivka: boolean
    traferet: boolean
    telegraf: boolean
    osobixusloviyax: boolean
}

const AddVagonModal: React.FC<ModalFormProps> =
    ({ setOpen,
        bolshoykuzov,
        pereveska,
        opredelenniyeperiodi,
        plomba,
        ochistka,
        promivka,
        traferet,
        telegraf,
        osobixusloviyax }) => {

        const [nomervagon, setNomervagon] = useState("")
        const [primechaniye, setPrimechaniye] = useState("")
        const [kodvagona, setKodvagona] = useState("")
        const [tipkonteyner, setTipkonteyner] = useState("")
        const [nomerkonteyner, setNomerkonterner] = useState("")
        const [klienta, setKlienta] = useState("")
        const [nomergu45, setNomerGu45] = useState("");
        const [naimenovaniegruz, setnNimenovaniegruz] = useState("");

        // submit funksiyasi
        const handleSave = async (e: React.FormEvent) => {
            e.preventDefault();

            // GU45 jadvaliga qo‘shamiz
            const { data, error } = await supabase
                .from("vagon")
                .insert([
                    {
                        nomervagon: nomervagon,
                        primechaniye: primechaniye,
                        kodvagona: kodvagona,
                        tipkonteyner: tipkonteyner,
                        nomerkonteyner: nomerkonteyner,
                        klienta: klienta,
                        nomergu45: nomergu45,
                        naimenovaniegruz: naimenovaniegruz,
                    },
                ])
                .select();

            if (error) {
                console.error("Xatolik:", error.message);
                return;
            }

            setOpen(false);
        };

        return (
            <React.Fragment>
                <div
                    className="fixed inset-0 bg-white/10 bg-opacity-10 backdrop-blur-xs z-40"
                    onClick={() => setOpen(false)}
                ></div>

                <div className=" w-[300px] md:w-[600px] lg:w-[800px] h-[400px] md:h-[565px]  overflow-y-scroll m-auto fixed inset-0 z-50 p-4 bg-white rounded-lg shadow-xl" >
                    <div>
                        <p className=' text-center text-xl md:text-2xl'>Формирование строки ГУ-45</p>
                        <hr className=" text-gray-300 my-3" />
                    </div>

                    <form className="px-6 pt-6 pb-4">
                        <div className=' w-full flex flex-col md:flex-row justify-between items-center gap-5 mb-5 '>
                            <div className=' w-full'>
                                <label className=" text-sm" htmlFor="nomervagon">№ вагонов</label>
                                <input
                                    className='w-full border p-1 rounded border-gray-300'
                                    type="number"
                                    id='nomervagon'
                                    value={nomervagon}
                                    onChange={(e) => setNomervagon(e.target.value)}
                                />
                            </div>
                            <div className=' w-full'>
                                <label className=" text-sm" htmlFor="kodvagona">Код вагона</label>
                                <input
                                    className='w-full border p-1 rounded border-gray-300'
                                    type="text"
                                    id='kodvagona'
                                    value={kodvagona}
                                    onChange={(e) => setKodvagona(e.target.value)}
                                />
                            </div>

                        </div>

                        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-5 mb-5 ">
                            <div className=' w-full'>
                                <label className=" text-sm" htmlFor="primechaniye">Примечание</label>
                                <input
                                    className='w-full border p-1 rounded border-gray-300'
                                    type="text"
                                    id='primechaniye'
                                    value={primechaniye}
                                    onChange={(e) => setPrimechaniye(e.target.value)}
                                />
                            </div>


                            <div className=' w-full'>
                                <label className=" text-sm" htmlFor="naimenovaniegruz">Наименование груза</label>
                                <input
                                    className='w-full border p-1 rounded border-gray-300'
                                    type="text"
                                    id='naimenovaniegruz'
                                    value={naimenovaniegruz}
                                    onChange={(e) => setnNimenovaniegruz(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-5 mb-5">
                            <div className=' w-full'>
                                <label className=" text-sm" htmlFor="tipkonteyner">Тип контейнера</label>
                                <input
                                    className='w-full border p-1 rounded border-gray-300'
                                    type="text"
                                    id='tipkonteyner'
                                    value={tipkonteyner}
                                    onChange={(e) => setTipkonteyner(e.target.value)}
                                />
                            </div>
                            <div className=' w-full'>
                                <label className=" text-sm" htmlFor="nomerkonteyner">Номер контейнера</label>
                                <input
                                    className='w-full border p-1 rounded border-gray-300'
                                    type="number"
                                    id='nomerkonteyner'
                                    value={nomerkonteyner}
                                    onChange={(e) => setNomerkonterner(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className=' w-full flex flex-col md:flex-row justify-between items-center gap-5 mb-5'>
                            <div className=' w-full'>
                                <label className=" text-sm" htmlFor="klienta">Клиента</label>
                                <input
                                    className='w-full border p-1 rounded border-gray-300'
                                    type="text"
                                    id='klienta'
                                    value={klienta}
                                    onChange={(e) => setKlienta(e.target.value)}
                                />
                            </div>
                            <div className="w-full">
                                <label className="text-sm" htmlFor="nomergu45">Номер ГУ-45</label>
                                <input
                                    className='w-full border p-1 rounded border-gray-300'
                                    type="number"
                                    id='nomergu45'
                                    value={nomergu45}
                                    onChange={(e) => setNomerGu45(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className=" flex justify-end space-x-3 py-5">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="cursor-pointer w-[130px] text-sm text-red-700 border-2 border-red-700 hover:bg-red-100 transition duration-500 font-semibold py-2 px-4 rounded-l  flex justify-center items-center gap-1">
                                <IoMdClose /> ЗАКРЫТЬ
                            </button>
                            <button
                                onClick={handleSave}
                                type="submit"
                                className="cursor-pointer w-[130px] text-sm text-green-700 border-2 border-green-700 hover:bg-green-100 transition duration-500 font-semibold py-2 px-4 rounded-r flex justify-center items-center gap-1">
                                <FaRegSave /> Сохранить
                            </button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    };

export default AddVagonModal;
