import React from 'react'

const Summary = () => {
    return (
        <div className='p-4'>

            <div className="grid grid-cols-3  gap-4">
                <div className="bg-blue-200 p-4  rounded-2xl shadow-lg hover:bg-blue-300" >


                    <h2 className="font-bold text-center mb-3"> Cars</h2>
                    <div className=" font-bold flex flex-col  justify-center">



                        <p>All Registerd in WebSite - </p>
                        <p>Available Cars - </p>
                        <p>Unavailable Cars - </p>
                    </div>






                </div>
                <div className="bg-blue-200 p-4 rounded-2xl shadow-lg hover:bg-blue-300">

                    <h2 className="font-bold text-center mb-3"> Users</h2>

                    <div className="font-bold flex flex-col  justify-center">

                        <p>All Registerd in WebSite - </p>



                    </div>




                </div>
                <div className="bg-blue-200 p-4 rounded-2xl shadow-lg hover:bg-blue-300">



                    <h2 className="font-bold text-center mb-3">Feedbacks</h2>

                    <div className=" font-bold flex flex-col  justify-center">



                        <p>All Feedbacks - </p>
                        <p>Approved Feedbacks - </p>
                        <p>Rejected Feedbacks - </p>
                        <p>Pending Feedbacks - </p>
                    </div>






                </div>
                <div className="bg-blue-200 p-4 rounded-2xl shadow-lg hover:bg-blue-300">



                <h2 className="font-bold text-center mb-3"> Bookings</h2>

                <div className=" font-bold flex flex-col  justify-center">

                    
      
                        <p>All Bookings - </p>
                        <p>Cancled Bookings - </p>
                        <p>Compleated Bookings - </p>
                        <p>Ongoing Bookings - </p>

                </div>

                </div>
       
            </div>






        </div>
    )
}

export default Summary