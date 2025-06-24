import React, { use } from 'react'
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Auth/AuthProvider';
import { useLoaderData } from 'react-router';




const Addpercel = () => {
  const { user } = use(AuthContext)
  const datas = useLoaderData()
  
  const regions = [...new Set(datas?.map((data) => data.region))];
  const districts = [...new Set(datas?.map((data) => data.district))];
  const { register, watch, handleSubmit } = useForm()
  
  const percelType = watch("percelType");
  const selectregion = watch('region')
const seletedistric = watch("district");
  const filterdistric = datas?.filter(item => item.region === selectregion).map(items => items.district)



  const filterservicecenter = datas?.find(
    (item) => item.district === seletedistric
  );
  
  const onSubmit = (data) => {
    console.log(data)
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl capitalize">
        <h1 className="text-4xl text-blue-500 font-bold text-center">
          Add your perlce{" "}
        </h1>
        {/* for percel info */}
        <fieldset className="border shadow-4xl flex justify-around p-5 items-center gap-5">
          <legend className="card-title">percle info</legend>
          <div className="flex flex-col gap-3 capitalize">
            <label className="card-title">titel</label>
            <input
              type="text"
              className="p-2 border border-gray-300"
              {...register("titel", { required: "please enter your name" })}
              placeholder="percle title"
            />
          </div>
          <div className="flex flex-col gap-5 capitalize">
            <label className="card-title">document type</label>
            <select
              className="border border-gray-300 p-2"
              {...register("percelType")}
            >
              <option value="document">document</option>
              <option value="Nondocument">Nondocument</option>
            </select>
            {percelType === "Nondocument" && (
              <div className="flex flex-col gap-2">
                <label>Document Weight</label>
                <input
                  type="text"
                  className="border border-gray-300 p-2"
                  {...register("waight", {
                    required:
                      percelType === "Nondocument" && "Please enter weight",
                  })}
                  placeholder="Enter weight in kg"
                />
              </div>
            )}
          </div>
        </fieldset>
        {/* for sender info  */}

        <fieldset className="border p-5 md:grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-10">
          <legend className="card-title">Sender Info</legend>
          <div className="flex flex-col gap-2 w-[200px]">
            <label className="card-title">Sender Name</label>
            <input
              className="border border-gray-300 w-full"
              type="text"
              defaultValue={user?.displayName}
              readOnly
            />
          </div>
          <div className="flex flex-col  gap-2 w-[100px]">
            <label className="card-title">regioun</label>
            <select {...register("region")} className="border ">
              {regions?.map((region) => (
                <option value={region} key={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>{" "}
          <div className="flex flex-col  gap-2 w-[100px]">
            <label className="card-title">Distric</label>
            <select {...register("district")} className="border ">
              {filterdistric?.map((district) => (
                <option value={district} key={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
          <select {...register("covered_area")} className="border">
            {filterservicecenter?.covered_area?.map((area) => (
              <option value={area} key={area}>
                {area}
              </option>
            ))}
          </select>
        </fieldset>
        <button className="btn btn-primary mt-10" type="submit">
          submit
        </button>
      </form>
    </div>
  );
}

export default Addpercel
