import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import "./Style.css";
import { useSelector } from "react-redux";
import axios from "axios";

const Profile = () => {
  const user = useSelector((store) => store.user);

  const [fName, setFName] = useState("");
  const [lName, setlName] = useState("");
  const [age, setage] = useState(18);
  const [gender, setgender] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [desc, setdesc] = useState("");
  const [profileUrl, setprofileUrl] = useState("");
  const [contact, setcontact] = useState(9000000000);
  const [input, setInput] = useState("");
  const [skills, setskills] = useState([]);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (user?.data) {
      setFName(user.data.firstName || "");
      setlName(user.data.lastName || "");
      setage(user.data.age || 18);
      setgender(user.data.gender || "");
      setemail(user.data.email || "");
      setpassword(user.data.password || "");
      setprofileUrl(user.data.photoUrl || "");
      setcontact(user.data.contact || 9000000000);
      setskills(user.data.skills || []);
      setdesc(user.data.desc || "");
    }
  }, [user]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      if (!skills.includes(input)) {
        setskills([...skills, input.trim()]);
      }
      setInput("");
    }
  };

  const removeSkill = (skill) => {
    setskills(skills.filter((item) => item !== skill));
  };

  const handleButton = async () => {
    try {
      const res = await axios.patch(
        import.meta.env.VITE_BASE_URL + "/profile/edit",
        {
          firstName: fName,
          lastName: lName,
          age,
          gender,
          contact,
          photoUrl: profileUrl,
          skills,
          desc,
        },
        { withCredentials: true }
      );
      if (res.status == 200) {
        setEditable(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col  gap-1 px-4  rounded  justify-between w-auto sm:w-full bg-base-300 m-auto">
      <div className="avatar flex flex-col sm:flex sm:flex-row   align-center  items-center gap-3 p-7">
        <div className="w-24 rounded-full">
          <img src={profileUrl || null} alt="user-img" />
        </div>
        <h1 className="text-2xl">{fName + " " + lName}</h1>
        <button
          className="m-0 sm:ml-auto cursor-pointer rounded-md bg-blue-500 text-white px-4 py-2 flex justify-items-center items-center gap-1"
          onClick={() => setEditable((prev) => !prev)}
        >
          <span>
            <FiEdit size={18} />
          </span>
          Edit
        </button>
      </div>

      <div className=" w-full">
        <fieldset className="fieldset">
          <div className="flex flex-col my-1 items-center sm:justify-evenly sm:flex-row md:justify-center">
            <div className="w-full sm:w-100 items-center">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                name={fName}
                value={fName}
                readOnly={!editable}
                onChange={(e) => setFName(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-100 items-center">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                name={lName}
                value={lName}
                readOnly={!editable}
                onChange={(e) => setlName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col my-1 items-center sm:justify-evenly sm:flex-row md:justify-center">
            <div className="w-full sm:w-100 items-center">
              <legend className="fieldset-legend">Gender</legend>
              <input
                type="radio"
                className="radio radio-xs mr-1"
                placeholder="Type here"
                value="male"
                name="gender"
                onChange={(e) => setgender(e.target.value)}
                checked={gender === "male"}
                disabled={!editable}
              />
              <label className="mr-3">Male</label>

              <input
                type="radio"
                className="radio radio-xs mr-1"
                placeholder="Type here"
                value="female"
                name="gender"
                onChange={(e) => setgender(e.target.value)}
                checked={gender === "female"}
                disabled={!editable}
              />
              <label className="mr-3">Female</label>
              <input
                type="radio"
                className="radio radio-xs mr-1"
                placeholder="Type here"
                value="others"
                name="gender"
                onChange={(e) => setgender(e.target.value)}
                checked={gender === "others"}
                disabled={!editable}
              />
              <label className="mr-3">Others</label>
            </div>
            <div className="w-full sm:w-100 items-center">
              <legend className="fieldset-legend">Age</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={age}
                name={age}
                onChange={(e) => setage(e.target.value)}
                readOnly={!editable}
              />
            </div>
          </div>
          <div className="flex flex-col my-1 items-center sm:justify-evenly sm:flex-row md:justify-center">
            <div className="w-full sm:w-100 items-center">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={email}
                name={email}
                onChange={(e) => setemail(e.target.value)}
                readOnly={true}
              />
            </div>
            <div className="w-full sm:w-100 items-center">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                placeholder="Type here"
                value={password}
                name={password}
                onChange={(e) => setpassword(e.target.value)}
                readOnly={true}
              />
            </div>
          </div>
          <div className="flex flex-col my-1 items-center sm:justify-evenly sm:flex-row md:justify-center">
            <div className="w-full sm:w-100 items-center">
              <legend className="fieldset-legend">Contact</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={contact}
                name={contact}
                onChange={(e) => setcontact(e.target.value)}
                readOnly={!editable}
              />
            </div>
            <div className="w-full sm:w-100 items-center">
              <legend className="fieldset-legend">Profile Photo</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={profileUrl}
                name={profileUrl}
                onChange={(e) => setprofileUrl(e.target.value)}
                readOnly={!editable}
              />
            </div>
          </div>
          <div className="flex flex-col my-1 items-center sm:justify-evenly sm:flex-row md:justify-center">
            <div className="w-full sm:w-100 items-center">
              <legend className="fieldset-legend">Skills</legend>
              <div className="flex flex-wrap overflow-y-auto items-center gap-2 input p-2 ">
                {skills.length > 0 &&
                  skills.map((skill, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="text-blue-500 hover:text-blue-700 text-xs font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                <input
                  type="text"
                  placeholder="Type here and press enter"
                  name={input}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  readOnly={!editable}
                />
              </div>
            </div>
            <div className="w-full sm:w-100 items-center">
              <legend className="fieldset-legend">Brief About Yourself</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={desc}
                name={desc}
                onChange={(e) => setdesc(e.target.value)}
                readOnly={!editable}
              />
            </div>
          </div>
        </fieldset>
      </div>

      <div className="flex justify-center items-center mt-3 pb-4">
        <button
          onClick={handleButton}
          className="cursor-pointer rounded-md bg-blue-500 text-white px-4 py-2"
        >
          {editable ? "Save Changes" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
