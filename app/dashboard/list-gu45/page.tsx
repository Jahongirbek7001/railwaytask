"use client"

import { options } from "@/store/datagu45";
import React, { useEffect, useState } from "react";
import { FaEye, FaDownload, FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";
import DatePicker from "react-datepicker";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
const ListGU45 = () => {
    const [options, setOptions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const toggleFilter = () => {
        setIsFilterVisible(!isFilterVisible);
    };

    useEffect(() => {
        const fetchGU45 = async () => {
            setLoading(true);

            const { data, error } = await supabase
                .from("gu45")
                .select("*") // kerakli ustunlarni yozsangiz ham bo‘ladi: "id, numbergu45, user_id"

            if (error) {
                console.error("Error fetching GU45:", error);
            } else {
                setOptions(data || []);
            }

            setLoading(false);
        };

        fetchGU45();
    }, []);
    return (
        <React.Fragment>
            <div className="min-h-screen p-3 bg-gray-100">
                <div className="w-[300px] md:w-[700px] lg:w-full bg-white rounded-2xl p-5">
                    <div>
                        <h2 className="text-xl font-semibold leading-tight mb-5">Список ГУ-45</h2>
                    </div>

                    <div className="my-2 flex md:flex-row flex-col justify-between h-[90px] md:h-[40px]">
                        <div className=" flex justify-start md:justify-center  gap-3 h-[40px]">
                            <div>
                                <button className="h-full py-1 px-5 border border-gray-300 cursor-pointer rounded bg-green-500 hover:bg-green-600 text-white text-[12px]">
                                    <Link href={'/dashboard/create-gu-45'}>
                                        Создать ГУ-45
                                    </Link>
                                </button>
                            </div>
                            <div>
                                <button className="h-full py-1 px-5 border border-gray-300 cursor-pointer rounded bg-blue-500 hover:bg-blue-600 text-white text-[12px]" onClick={toggleFilter}>
                                    Фильтр
                                </button>
                            </div>
                        </div>
                        <div className={` flex sm:flex-row flex-col mt-2 md:m-0 ${isFilterVisible ? "block" : "hidden"}`}>
                            <div className="flex flex-row sm:mb-0">
                                <div className="relative">
                                    <label className="absolute left-3 top-1/2 -translate-y-1/2 text-sm pointer-events-none">
                                        От
                                    </label>
                                    <input
                                        type="date"
                                        placeholder="От"
                                        className="h-full w-full cursor-pointer rounded-l border border-gray-400 border-b block pl-8 pr-6 py-2 bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                                    />
                                </div>
                                <div className="relative">
                                    <label className="absolute left-3 top-1/2 -translate-y-1/2 text-sm pointer-events-none">
                                        До
                                    </label>
                                    <input
                                        type="date"
                                        placeholder="До"
                                        className="h-full w-full cursor-pointer border-y border-gray-400 border-b block pl-8 pr-6 py-2 bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                                    />
                                </div>
                                <div className="relative">
                                    <select
                                        className=" h-full cursor-pointer border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight">
                                        <option>Показать записей</option>
                                        <option>5</option>
                                        <option>10</option>
                                        <option>20</option>
                                    </select>
                                </div>
                                <div className="relative">
                                    <select
                                        className=" h-full cursor-pointer rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block  w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight">
                                        <option>Статус</option>
                                        <option>Все</option>
                                        <option>Активные</option>
                                        <option>Аннулирование</option>
                                    </select>
                                </div>
                            </div>
                            <div className="block relative ">
                                <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                                        <path
                                            d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                                        </path>
                                    </svg>
                                </span>
                                <input placeholder="Поиск из таблиц"
                                    className=" h-full  border-y border-l border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                            </div>
                            <div>
                                <button className="h-full py-1 px-5 border-y border-r border-gray-300 cursor-pointer rounded-r bg-blue-500 hover:bg-blue-600 text-white text-[12px]">
                                    Обновить
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr className=" text-gray-300 my-5" />
                    <div className="overflow-x-auto">
                        <div className="w-full inline-block shadow rounded-lg min-w-full overflow-x-auto">
                            {loading ? (
                                <p>Загрузка...</p>
                            ) : (
                                <table className="w-full text-[10px] mx-auto bg-white border space-y-1 text-zinc-800 min-w-full">
                                    <thead className=" w-full border-collapse">
                                        <tr className=" sticky top-0 z-10 bg-white">
                                            <th className="px-5 py-6 xl:py-2 border border-gray-300">№ ГУ-45</th>
                                            <th className="px-5 py-6 xl:py-2 border border-gray-300">Станция</th>
                                            <th className="px-5 py-6 xl:py-2 border border-gray-300">Тип подача</th>
                                            <th className="px-7 py-6 xl:py-2 border border-gray-300">Грузовладелец</th>
                                            <th className="px-7 py-6 xl:py-2 border border-gray-300">Ветвевладелец</th>
                                            <th className="px-5 py-6 xl:py-2 border border-gray-300">Вагон</th>
                                            <th className="px-5 py-6 xl:py-2 border border-gray-300">Дата создания</th>
                                            <th className="px-5 py-6 xl:py-2 border border-gray-300">Автор</th>
                                            <th className="px-2 py-6 xl:py-2 border border-gray-300">№ <br /> ГУ-46</th>
                                            <th className="px-2 py-6 xl:py-2 border border-gray-300">№ <br /> ФДУ-92</th>
                                            <th className="px-6 py-6 xl:py-2 border border-gray-300">Статус</th>
                                            <th className="overflow-x-auto border border-gray-300">Комментария</th>
                                            <th className="px-20 py-6 xl:py-2 border border-gray-300">Действия</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {options.map((option, index) => (
                                            <tr
                                                key={index}
                                                className={
                                                    index % 2 === 1
                                                        ? "text-left border bg-gray-100"
                                                        : "text-left border"
                                                }
                                            >
                                                <td className="px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300">{option.nomergu45}</td>
                                                <td className="px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300">{option.stansiya}</td>
                                                <td className="px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300">{option.tippodacha}</td>
                                                <td className="px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300">{option.gruzovladelets}</td>
                                                <td className="px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300">{option.vetvevladelets}</td>
                                                <td className="px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300">Vagon</td>
                                                <td className="px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300">{option.create_date}</td>
                                                <td className="px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300">{option.avtor}</td>
                                                <td className="px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300">{option.nomergu46}</td>
                                                <td className="px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300">{option.nomerfdu92}</td>
                                                <td className="px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300">Status</td>
                                                <td className="px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300">{option.kommentariya}</td>
                                                <td className="px-3 py-6 xl:py-2 gap-2 border border-gray-300">
                                                    <div className="flex justify-center items-center gap-2 md:hidden">
                                                        <button className="w-[30px] h-[30px] rounded border flex items-center justify-center cursor-pointer text-blue-500">
                                                            <FaEye size={16} />
                                                        </button>
                                                        <button className="w-[30px] h-[30px] rounded border flex items-center justify-center cursor-pointer text-green-500">
                                                            <FaDownload size={16} />
                                                        </button>
                                                        <button className="w-[30px] h-[30px] rounded border flex items-center justify-center cursor-pointer text-yellow-500">
                                                            <FaEdit size={16} />
                                                        </button>
                                                        <button className="w-[30px] h-[30px] rounded border flex items-center justify-center cursor-pointer text-red-500">
                                                            <FaTrash size={16} />
                                                        </button>
                                                        <button className="w-[30px] h-[30px] rounded border flex items-center justify-center cursor-pointer text-gray-500">
                                                            <FaInfoCircle size={16} />
                                                        </button>
                                                    </div>
                                                    <div className=" hidden md:grid grid-cols-1 xl:grid-cols-2 w-full gap-2">
                                                        <button className=" cursor-pointer font-semibold text-[12px] ">
                                                            <span
                                                                className="relative px-3 py-1 font-semibold text-blue-900 leading-tight  flex justify-center">
                                                                <span aria-hidden
                                                                    className="absolute inset-0 bg-blue-300 opacity-50 rounded-full"></span>
                                                                <span>Подробнее</span>
                                                            </span>
                                                        </button>
                                                        <button className=" cursor-pointer font-semibold text-[12px] ">
                                                            <span
                                                                className="relative px-3 py-1 font-semibold text-green-900 leading-tight  flex justify-center">
                                                                <span aria-hidden
                                                                    className="absolute inset-0 bg-green-300 opacity-50 rounded-full"></span>
                                                                <span>Скачать</span>
                                                            </span>
                                                        </button>
                                                        <button className=" cursor-pointer font-semibold text-[12px] ">
                                                            <span
                                                                className="relative px-3 py-1 font-semibold text-yellow-900 leading-tight  flex justify-center">
                                                                <span aria-hidden
                                                                    className="absolute inset-0 bg-yellow-300 opacity-50 rounded-full"></span>
                                                                <span>Редактировать</span>
                                                            </span>
                                                        </button>
                                                        <button className=" cursor-pointer font-semibold text-[12px]">
                                                            <span
                                                                className="relative px-3 py-1 font-semibold text-red-900 leading-tight  flex justify-center">
                                                                <span aria-hidden
                                                                    className="absolute inset-0 bg-red-300 opacity-50 rounded-full"></span>
                                                                <span>Удалить</span>
                                                            </span>
                                                        </button>
                                                        <button className=" cursor-pointer font-semibold text-[12px] ">
                                                            <span
                                                                className="relative px-3 py-1 font-semibold text-gray-900 leading-tight  flex justify-center">
                                                                <span aria-hidden
                                                                    className="absolute inset-0 bg-gray-300 opacity-50 rounded-full"></span>
                                                                <span>Информация</span>
                                                            </span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            )}
                        </div>
                        <div
                            className="px-5 py-5 bg-white flex flex-col xs:flex-row items-center xs:justify-between">
                            <div className="mt-2 xs:mt-0 flex gap-3">
                                <button
                                    className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                                    Prev
                                </button>
                                <div className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4">
                                    <span className="">
                                        1 to 4
                                    </span>
                                </div>
                                <button
                                    className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ListGU45