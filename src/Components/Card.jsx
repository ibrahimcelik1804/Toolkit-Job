import axios from "axios";
import DelButton from "./DelButton";
import { MdLocationOn } from "react-icons/md";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { FaSuitcase } from "react-icons/fa";
import { toast } from "react-toastify";
import { deleteJob } from "../redux/slice/jobSlice";
import { useDispatch } from "react-redux";

const Card = ({ job }) => {
  const dispatch = useDispatch();

  const color = {
    "Devam Ediyor": "orange",
    Mülakat: "green",
    Reddedildi: "red",
  };
  const handleDelete = () => {
    // 1. api istegi at ve veritabanından işi kalldır
    if (confirm("Silmek istediğinizden emin misiniz ?")) {
      axios
        .delete(`http://localhost:4000/jobs/${job.id}`)

        // 2. başarılı olursa stordan veriyi kladır
        .then(() => {
          toast.info("Silme İşlemi Başarılı");
          dispatch(deleteJob(job.id));
        })

        // 3. başarısız olursa uyarı ver ekrana
        .catch(() => {
          toast.warn("Silme İşlemi Başarısız");
        });
    }
  };
  return (
    <div className="card">
      {/* üst */}
      <div className="head">
        <div className="left">
          <div className="letter">
            <span>{job.company[0]}</span>
          </div>
          <div>
            <p>{job.position}</p>
            <p>{job.company}</p>
          </div>
        </div>
        <div className="right">
          <DelButton handleDelete={handleDelete} />
        </div>
      </div>
      {/* alt */}
      <div className="body">
        <div className="field">
          <MdLocationOn />
          <p>{job.location}</p>
        </div>
        <div className="field">
          <FaSuitcase /> <p>{job.type}</p>
        </div>
        <div className="field">
          <BsFillCalendarDateFill />
          <p>{job.date}</p>
        </div>
        <div
          className="status"
          style={{ width: "130px", background: color[job.status] }}
        >
          <p>{job.status}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
