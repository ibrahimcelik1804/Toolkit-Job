import React, { useEffect, useState } from "react";
import { sortOpt, statusOpt, typeOpt } from "../constants";
import { useDispatch } from "react-redux";
import {
  clearFilters,
  filterBySearch,
  sortJobs,
} from "../redux/slice/jobSlice";

const Filter = ({ jobs }) => {
  const [text, setText] = useState("");
  // Her tuş vuruşunda filtreleme yapmak uygulamada yavaşlamalara ve gereksiz yere
  //api isteklerine sebep olur. Her tuş vuruşunda yapmak yerine kullanıcı yazmayı
  //bitirdiğinde filtreleme yapmamız gerekir bu işlemede DEBOUNCE denir
  const dispatch = useDispatch();
  useEffect(() => {
    // bir sayaç başlatıcagız ve işlemi sayaç duruduğunda yap
    const timer = setTimeout(() => {
      dispatch(filterBySearch({ field: "position", text }));
    }, 500);
    // egerki süre bitmeden tekrardan useEffect çalışırsa önceki yayacı sıfırla
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <section className="filter-sec">
      <h2>Filtreleme Formu</h2>
      <form>
        <div>
          <label>Şirket İsmine Göre Ara</label>
          <input type="text" onChange={(e) => setText(e.target.value)} />
        </div>
        <div className="">
          <label>Durum</label>
          <select
            onChange={(e) =>
              dispatch(
                filterBySearch({ field: "status", text: e.target.value })
              )
            }
            name="status"
          >
            <option value="" hidden>
              Seçiniz
            </option>
            {statusOpt.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </div>
        <div className="">
          <label>Tür</label>
          <select
            onChange={(e) =>
              dispatch(filterBySearch({ field: "type", text: e.target.value }))
            }
            name="type"
          >
            <option value="" hidden>
              Seçiniz
            </option>
            {typeOpt.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </div>

        <div className="">
          <label>Sırala</label>
          <select
            onChange={(e) => dispatch(sortJobs(e.target.value))}
            name="type"
          >
             <option value="" hidden>
              Seçiniz
            </option>
            {sortOpt.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </div>
        <div>
          <button
            onClick={() => dispatch(clearFilters())}
            type="reset"
            className="button"
          >
            <span className="button__text">Filtreleri Sıfırla</span>
            <span className="button__icon">
              <img src="item4.svg" alt="" />
            </span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default Filter;
