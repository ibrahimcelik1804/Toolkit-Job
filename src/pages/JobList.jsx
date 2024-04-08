import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError, setJobs, setLoading } from "../redux/slice/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import Loader from "../Components/Loader";
import Card from "../Components/Card";
import Filter from "../Components/Filter";

const jobList = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.jobSlice);
  // apiden verileri alıp stora aktarır
  const fectData = () => {
    //1. yüklenme durumunu güncelle
    dispatch(setLoading());
    axios
      .get("http://localhost:4000/jobs")
      //2. veri gelirse stora aktar
      .then((res) => dispatch(setJobs(res.data)))
      //3. hata olursa hatayı görüntüler
      .catch((err) => dispatch(setError(err.message)));
  };
  useEffect(() => {
    fectData();
  }, []);

  //console.log(state.jobs);
  return (
    <div className="list-page">
      <Filter jobs={state.jobs}/>
      {/* 1. yüklenme devam ediyorsa
        2. yüklenme bittiyse ve hata varsa hata mesajı ve tekrar button bas
        3. yüklenme bittiyse ve hata yoksa kartları ekrana bas
    */}
      {state.isLoading ? (
        <Loader  />
      ) : state.isError ? (
        <div className="error">
          <p>
            Üzgünüz verilere erişirken bir sorun oluştu.
            <span>{state.isError}</span>
          </p>
          <button onClick={fectData} class="ui-btn">
            <span>TEKRAR DENE</span>
          </button>
        </div>
      ) : (
        <div className="job-list">
          {state.jobs.map((job) => (
            <Card job={job} key={job.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default jobList;
