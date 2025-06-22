import React from 'react'

const BuyNow = () => {
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-center my-10">Buy Now</h1>
        <p className="text-center text-gray-500">
          Please fill out the form below to proceed with your purchase.
        </p>
      </div>

      <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
        <div>
          <form className=" mx-auto mt-8">
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                className="border border-gray-300 p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="border border-gray-300 p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                className="border border-gray-300 p-2 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BuyNow
