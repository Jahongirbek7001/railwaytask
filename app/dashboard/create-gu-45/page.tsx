'use client'

import React, { useEffect, useState } from 'react'
import { GrClearOption } from "react-icons/gr";
import { IoMdArrowBack } from "react-icons/io";
import { FaRegSave } from "react-icons/fa";
import AddGU45Modal from '@/components/add-gu-45-modal';
import EditGU45Modal from '@/components/edit-gu-45-modal';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import AddVagonModal from '@/components/add-vagon-modal';
import { FaEdit } from "react-icons/fa";
import EditVagon from '@/components/edit-vagon';
import { useSearchParams } from "next/navigation";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { IoMdRefresh } from "react-icons/io";

interface Vagon {
  nomervagon: string;
  kodvagona: string;
  tipkonteyner: string;
  nomerkonteyner: string;
  klienta: string;
  naimenovaniegruz: string;
  primechaniye: string;
  create_date: string;
  bolshoykuzov: boolean;
  pereveska: boolean;
  opredelenniyeperiodi: boolean;
  plomba: boolean;
  ochistka: boolean;
  promivka: boolean;
  traferet: boolean;
  telegraf: boolean;
  osobixusloviyax: boolean;
}

const CreateGU45 = () => {

  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openEditVagon, setOpenEditVagon] = useState(false)
  const [openvagon, setOpenvagon] = useState(false)
  const [userid, setUserId] = useState<string | null>(null);
  const [fullname, setFullname] = useState<string | null>(null)
  const [adddatagu45, setAdddatagu45] = useState<Vagon[]>([])
  const [bolshoykuzov, setBolshoykuzov] = useState(false)
  const [pereveska, setPereveska] = useState(false)
  const [opredelenniyeperiodi, setOpredelenniyeperiodi] = useState(false)
  const [plomba, setPlomba] = useState(false)
  const [ochistka, setOchistka] = useState(false)
  const [promivka, setPromivka] = useState(false)
  const [traferet, setTraferet] = useState(false)
  const [telegraf, setTelegraf] = useState(false)
  const [osobixusloviyax, setOsobixusloviyax] = useState(false)
  const [nomergu45, setNomergu45] = useState('')
  const searchParams = useSearchParams();
  const updated = searchParams.get("updated");
  const [showAlert, setShowAlert] = useState(Boolean(updated));
  const [showSuccess, setShowSuccess] = useState(false);

  setTimeout(() => {
    setShowAlert(false);
  }, 2000);
  const refreshBtn = () => {
    setShowAlert(false);
    window.location.href = "/dashboard/create-gu-45";
  }

  useEffect(() => {
    const getData = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError) {
        console.error("User olishda xatolik:", userError.message);
        return;
      }

      if (userData?.user) {
        const userId = userData.user.id;
        setUserId(userId);
        setFullname(userData.user.user_metadata.fullname);

        const { data: gu45Data, error: gu45Error } = await supabase
          .from("gu45")
          .select("nomergu45")
          .eq("gu45userid", userId)
          .single();

        if (gu45Error) {
          console.error("GU45 olishda xatolik:", gu45Error.message);
          return;
        }

        if (gu45Data?.nomergu45) {
          const nomergu45 = gu45Data.nomergu45;
          setNomergu45(nomergu45)

          const { data: vagonData, error: vagonError } = await supabase
            .from("vagon")
            .select("*")
            .eq("nomergu45", nomergu45);
          if (vagonError) {
            console.error("Vagon olishda xatolik:", vagonError.message);
          } else {
            setAdddatagu45(vagonData);
            setBolshoykuzov(vagonData[0].bolshoykuzov)
            setPereveska(vagonData[0].pereveska)
            setOpredelenniyeperiodi(vagonData[0].opredelenniyeperiodi)
            setPereveska(vagonData[0].pereveska)
            setOpredelenniyeperiodi(vagonData[0].opredelenniyeperiodi)
            setPlomba(vagonData[0].plomba)
            setOchistka(vagonData[0].ochistka)
            setPromivka(vagonData[0].promivka)
            setTraferet(vagonData[0].traferet)
            setTelegraf(vagonData[0].telegraf)
            setOsobixusloviyax(vagonData[0].osobixusloviyax)

          }
        }
      }
    };

    getData();
  }, []);
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("vagon")
      .update([
        {
          bolshoykuzov: bolshoykuzov,
          pereveska: pereveska,
          opredelenniyeperiodi: opredelenniyeperiodi,
          plomba: plomba,
          ochistka: ochistka,
          promivka: promivka,
          traferet: traferet,
          telegraf: telegraf,
          osobixusloviyax: osobixusloviyax,
        },
      ])
      .eq("nomergu45", nomergu45);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false); // 2 soniyadan so'ng yana false qilish
    }, 2000);

    if (error) {
      console.error("Xatolik:", error.message);
      return;
    }
  };



  return (
    <React.Fragment>
      {updated && (
        <div
          className=" absolute bottom-5 right-5 flex items-center gap-3 bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700"
          role="alert"
        >
          <BsFillInfoCircleFill />
          <div>
            <span className="font-medium">Successfull update</span> Change a few things up and try submitting again.
          </div>
        </div>
      )}
      {showSuccess && (
        <div
          className="flex items-center gap-3 bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700"
          role="alert"
        >
          <BsFillInfoCircleFill />
          <div>
            <span className="font-medium">Successfull</span> Change a few things up and try submitting again.
          </div>
        </div>
      )}

      <div className="min-h-screen py-5 px-1 md:p-5 bg-gray-100">
        <div className="w-[300px] md:w-[700px] lg:w-full bg-white rounded-2xl p-5 mx-auto">
          <div>
            <h2 className="text-xl font-semibold leading-tight mb-5">Список ГУ-45</h2>
          </div>
          <hr className=" text-gray-300 my-5" />
          <div>
            <p className=' text-xl my-2'>Строка вагонов</p>
            <button
              onClick={() => setOpen(true)}
              className="h-full py-1 px-5 mr-3 mb-3 border border-gray-300 cursor-pointer rounded bg-green-500 hover:bg-green-600 text-white "
            >
              Добавить строку
            </button>
            <button
              onClick={() => setOpenvagon(true)}
              className="h-full py-1 px-5 mb-3 border border-gray-300 cursor-pointer rounded bg-blue-500 hover:bg-blue-600 text-white "
            >
              Добавить строку
            </button>
            <button className=' cursor-pointer mx-3 ' onClick={refreshBtn}>
              <IoMdRefresh />
            </button>
          </div>
          <div className="overflow-x-auto" >
            <div className="w-full inline-block shadow rounded-lg p-1 overflow-auto max-h-[400px]">
              <div className="flex w-full overflow-x-auto">
                <table className="w-full text-[12px] mx-auto bg-white border space-y-1 text-zinc-800 ">
                  <thead className='w-full h-full border-collapse'>
                    <tr className="sticky top-0 z-10 bg-white">
                      <th className="px-5 py-6 xl:py-2 border border-gray-300">№ вагонов</th>
                      <th className="px-5 py-6 xl:py-2 border border-gray-300">Код вагона</th>
                      <th className="px-5 py-6 xl:py-2 border border-gray-300">Тип и номер контейнера</th>
                      <th className="px-5 py-6 xl:py-2 border border-gray-300">Клиента</th>
                      <th className="px-5 py-6 xl:py-2 border border-gray-300">Наименование груза</th>
                      <th className="px-5 py-6 xl:py-2 border border-gray-300">Число подачи</th>
                      <th className="px-5 py-6 xl:py-2 border border-gray-300">Число окончания</th>
                      <th className="px-5 py-6 xl:py-2 border border-gray-300">Число уборки</th>
                      <th className="px-5 py-6 xl:py-2 border border-gray-300">Примечание</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adddatagu45.map((i, index) => (
                      <React.Fragment key={index}>
                        <tr className={
                          index % 2 === 1
                            ? "text-left border bg-gray-100"
                            : "text-left border"
                        }
                        >
                          <td className='px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300'>{i.nomervagon}</td>
                          <td className='px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300'>{i.kodvagona}</td>
                          <td className='px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300'>{i.tipkonteyner} | {i.nomerkonteyner}</td>
                          <td className='px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300'>{i.klienta}</td>
                          <td className='px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300'>{i.naimenovaniegruz}</td>
                          <td className='px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300'>{i.create_date}</td>
                          <td className='px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300'>{i.create_date}</td>
                          <td className='px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300'>{i.create_date}</td>
                          <td className='px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300'>{i.primechaniye}</td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
                <table className="w-full text-[12px] mx-auto bg-white border space-y-1 text-zinc-800 ">
                  <thead className='w-full h-full  border-collapse'>
                    <tr>
                      <th className="px-5 py-6 xl:py-2 border border-gray-300" colSpan={10}>Доп. ж.д. услуга</th>
                    </tr>
                    <tr>
                      <th className="p-1 border border-gray-300">4.1-4.2 <br />Большое кузов</th>
                      <th className="p-1 border border-gray-300">6.1 <br />Перевеска ж.д.</th>
                      <th className="p-1 border border-gray-300">9.1 <br />Определённые периоды</th>
                      <th className="p-1 border border-gray-300">7.1 <br />Пломба</th>
                      <th className="p-1 border border-gray-300">16.1 <br />Очистка</th>
                      <th className="p-1 border border-gray-300">Промывка</th>
                      <th className="p-1 border border-gray-300">2.5 <br />Траферет</th>
                      <th className="p-1 border border-gray-300">2.9 <br />Уведомления</th>
                      <th className="p-1 border border-gray-300">2.1-2.2 <br />Особых условиях</th>
                      <th className="px-5 border border-gray-300" rowSpan={2}></th>
                    </tr>
                    <tr>
                      <th className="p-1 border border-gray-300" colSpan={9}>Все</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adddatagu45.map((i, index) => (
                      <React.Fragment key={index}>
                        <tr className={
                          index % 2 === 1
                            ? "text-left border bg-gray-100"
                            : "text-left border"
                        }>
                          <td className="px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300">
                            <input type="checkbox" checked={bolshoykuzov} onChange={(e) => setBolshoykuzov(e.target.checked)} />
                          </td>
                          <td className="px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300">
                            <input type="checkbox" checked={pereveska} onChange={(e) => setPereveska(e.target.checked)} />
                          </td>
                          <td className="px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300">
                            <input type="checkbox" checked={opredelenniyeperiodi} onChange={(e) => setOpredelenniyeperiodi(e.target.checked)} />
                          </td>
                          <td className="px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300">
                            <input type="checkbox" checked={plomba} onChange={(e) => setPlomba(e.target.checked)} />
                          </td>
                          <td className="px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300">
                            <input type="checkbox" checked={ochistka} onChange={(e) => setOchistka(e.target.checked)} />
                          </td>
                          <td className="px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300">
                            <input type="checkbox" checked={promivka} onChange={(e) => setPromivka(e.target.checked)} />
                          </td>
                          <td className="px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300">
                            <input type="checkbox" checked={traferet} onChange={(e) => setTraferet(e.target.checked)} />
                          </td>
                          <td className="px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300">
                            <input type="checkbox" checked={telegraf} onChange={(e) => setTelegraf(e.target.checked)} />
                          </td>
                          <td className="px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300">
                            <input type="checkbox" checked={osobixusloviyax} onChange={(e) => setOsobixusloviyax(e.target.checked)} />
                          </td>
                          <td className="px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300">
                            <button
                              onClick={() => setOpenEditVagon(true)}
                              className="w-[30px] h-[30px] rounded border flex items-center justify-center cursor-pointer text-yellow-500">
                              <FaEdit size={16} />
                            </button>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div
              className="px-5 py-5 bg-white flex justify-center items-center">
              <div className="mt-2 xs:mt-0 flex flex-col lg:flex-row justify-center items-center gap-3">
                <Link href='/'>
                  <button
                    className="cursor-pointer w-[130px] text-sm text-indigo-700 border-2 border-indigo-700 hover:bg-indigo-100 transition duration-500 font-semibold py-2 px-4 rounded-l  flex justify-center items-center gap-1">
                    <IoMdArrowBack /> Назад
                  </button>
                </Link>
                <button
                  className="cursor-pointer w-[130px] text-sm border-2 text-red-700 border-red-700 hover:bg-red-100 transition duration-500 font-semibold py-2 px-4 flex justify-center items-center gap-1">
                  <GrClearOption /> Очистить
                </button>
                <button onClick={handleSave}
                  type="submit"
                  className="cursor-pointer w-[130px] text-sm text-green-700 border-2 border-green-700 hover:bg-green-100 transition duration-500 font-semibold py-2 px-4 rounded-r flex justify-center items-center gap-1">
                  <FaRegSave /> Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openvagon && <AddVagonModal setOpen={setOpenvagon}
        bolshoykuzov={bolshoykuzov}
        pereveska={pereveska}
        opredelenniyeperiodi={opredelenniyeperiodi}
        plomba={plomba}
        ochistka={ochistka}
        promivka={promivka}
        traferet={traferet}
        telegraf={telegraf}
        osobixusloviyax={osobixusloviyax} />}

      {open && <AddGU45Modal setOpen={setOpen} userid={userid} fullname={fullname} />}
      {openEdit && <EditGU45Modal setOpenEdit={setOpenEdit} />}
      {openEditVagon && <EditVagon setOpenEditVagon={setOpenEditVagon} nomergu45={nomergu45} />}

    </React.Fragment>
  )
}

export default CreateGU45