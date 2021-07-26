import React, { useContext } from "react";
import "./Shipment.css";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
const Shipment = () => {
  const [userLoggedIn, setUserLoggedIn] = useContext(UserContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  console.log(watch("name"));

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        defaultValue={userLoggedIn.name}
        {...register("name", { required: true })}
        placeholder="Enter your name"
      />
      {errors.name && <span className="error">Name is required</span>}

      <input
        defaultValue={userLoggedIn.email}
        {...register("email", { required: true })}
        placeholder="Enter your Email"
      />
      {errors.email && <span className="error">Email is required</span>}

      <input
        {...register("address", { required: true })}
        placeholder="Enter your address"
      />
      {errors.address && <span className="error">Address is required</span>}

      <input
        {...register("phone", { required: true })}
        placeholder="Enter your phone"
      />
      {errors.phone && <span className="error">Phone number is required</span>}

      <input type="submit" />
    </form>
  );
};

export default Shipment;
