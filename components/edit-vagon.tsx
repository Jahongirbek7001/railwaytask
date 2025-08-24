'use client'

import React, { useEffect, useState } from "react";
import { IoMdClose } from 'react-icons/io'
import { FaRegSave } from 'react-icons/fa'
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

type ModalEditFormProps = {
    setOpenEditVagon: (value: boolean) => void
    nomergu45: string
}

const EditVagon: React.FC<ModalEditFormProps> = ({ setOpenEditVagon, nomergu45 }) => {
    const [nomervagon, setNomervagon] = useState("")
    const [primechaniye, setPrimechaniye] = useState("")
    const [kodvagona, setKodvagona] = useState("")
    const [tipkonteyner, setTipkonteyner] = useState("")
    const [nomerkonteyner, setNomerkonterner] = useState("")
    const [klienta, setKlienta] = useState("")
    const [naimenovaniegruz, setnNimenovaniegruz] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const GetData = async () => {
            const { data: vagonData, error: vagonError } = await supabase
                .from("vagon")
                .select("*")
                .eq("nomergu45", nomergu45);


            if (vagonError) {
                console.error("Vagon olishda xatolik:", vagonError.message);
            } else {
                setNomervagon(vagonData[0].nomervagon)
                setPrimechaniye(vagonData[0].primechaniye)
                setKodvagona(vagonData[0].kodvagona)
                setTipkonteyner(vagonData[0].tipkonteyner)
                setNomerkonterner(vagonData[0].nomerkonteyner)
                setKlienta(vagonData[0].klienta)
                setnNimenovaniegruz(vagonData[0].naimenovaniegruz)
            }
        }
        GetData()
    }, [])
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        // GU45 jadvaliga qo‘shamiz
        const { data, error } = await supabase
            .from("vagon")
            .update(
                {
                    nomervagon: nomervagon,
                    primechaniye: primechaniye,
                    kodvagona: kodvagona,
                    tipkonteyner: tipkonteyner,
                    nomerkonteyner: nomerkonteyner,
                    klienta: klienta,
                    naimenovaniegruz: naimenovaniegruz,
                },
            )
            .eq("nomergu45", nomergu45);


        if (!error) {
            setOpenEditVagon(false);
            router.push("/dashboard/create-gu-45?updated=true"); // sahifaga query bilan qaytish
        } else {
            console.log("Error updating:", error.message);
        }
    };

    return (
        <React.Fragment>
            <div className="fixed inset-0 bg-white/10 bg-opacity-10 backdrop-blur-xs z-40"
                onClick={() => setOpenEditVagon(false)}
            ></div>

            <div className=" w-[300px] md:w-[600px] lg:w-[800px] h-[400px] md:h-[565px]  overflow-y-scroll m-auto fixed inset-0 z-50 p-4 bg-white rounded-lg shadow-xl" >
                <div>
                    <p className=' text-center text-xl md:text-2xl'>Редактировать </p>
                    <hr className=" text-gray-300 my-3" />
                </div>
                <div className="w-full h-full"
                >
                    <form className="px-6 pt-6 pb-4" onSubmit={handleUpdate}>
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
                        </div>
                        <div className=" flex justify-end space-x-3 py-5">
                            <button
                                onClick={() => setOpenEditVagon(false)}
                                className="cursor-pointer w-[130px] text-sm text-red-700 border-2 border-red-700 hover:bg-red-100 transition duration-500 font-semibold py-2 px-4 rounded-l  flex justify-center items-center gap-1">
                                <IoMdClose /> ЗАКРЫТЬ
                            </button>
                            <button
                                type="submit"
                                onClick={handleUpdate}
                                className="cursor-pointer w-[130px] text-sm text-green-700 border-2 border-green-700 hover:bg-green-100 transition duration-500 font-semibold py-2 px-4 rounded-r flex justify-center items-center gap-1">
                                <FaRegSave /> Сохранить
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </React.Fragment>
    )
}

export default EditVagon