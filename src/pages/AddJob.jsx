import { v4 } from "uuid";
import { statusOpt, typeOpt } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import {
  createJob,
  setError,
  setJobs,
  setLoading,
} from "../redux/slice/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AddJob = () => {
  const state = useSelector((store) => store.jobSlice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setLoading());
    axios
      .get("http://localhost:4000/jobs")
      //2. veri gelirse stora aktar
      .then((res) => dispatch(setJobs(res.data)))
      //3. hata olursa hatayı görüntüler
      .catch((err) => dispatch(setError(err.message)));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newJob = Object.fromEntries(formData.entries());
    // tarih ve id ekle
    newJob.id = v4();
    newJob.date = new Date().toLocaleDateString();

    //api veriyi ekle
    axios
      .post("http://localhost:4000/jobs", newJob)

      // başarılı olursa store'a ekle
      .then(() => {
        toast.success("Yeni İş Eklendi");
        dispatch(createJob(newJob));
        navigate("/");
      })
      .catch(() => {
        toast.warn("Ekleme İşleminde Sorun Oluştu");
      });
    // başarısız alırsa uyarı ver
  };
  // dizide aynı elemanları kaldır
  const removeDuplicates = (key) => {
    const arr = state.jobs.map((i) => i[key]);
    const filtred = arr.filter((value, index) => arr.indexOf(value) === index);
    return filtred;
  };

  return (
    <div className="add-page">
      <section className="add-sec">
        <h2>Yeni İş Ekle</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Pozisyon</label>
            <input list="positions" name="position" type="text" required />
            <datalist id="positions">
              {removeDuplicates("position").map((i) => (
                <option value={i} />
              ))}
            </datalist>
          </div>
          <div className="">
            <label>Şirket</label>
            <input list="companys" name="company" type="text" required />
            <datalist id="companys">
            {removeDuplicates("company").map((i) => (
                <option value={i} />
              ))}
            </datalist>
          </div>
          <div className="">
            <label>Lokasyon</label>
            <input list="locations" name="location" type="text" required />
            <datalist id="locations">
            {removeDuplicates("location").map((i) => (
                <option value={i} />
              ))}
            </datalist>
          </div>
          <div className="">
            <label>Durum</label>
            <select name="status" required>
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
            <select name="type" required>
              <option value="" hidden>
                Seçiniz
              </option>
              {typeOpt.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </div>
          <div>
            <button className="button">
              <span className="button__text">İş Ekle</span>
              <span className="button__icon">
                <img src="item4.svg" alt="" />
              </span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
