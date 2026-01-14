
const Statistics = () => {
  return (
    <>
    {/* users  */}
    <div>
    <h2 className="text-[var(--text-color)] font-medium text-[30px]">Users</h2>
    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-[2rem] pt-[2rem] md:px-[5rem] px-[2rem]">
        <div className="bg-white shadow-[0px_0px_10px_#00000021] py-4 rounded-lg flex flex-col items-center gap-[1rem]">
            <h3 className="text-[var(--dark-blue)] font-bold text-3xl">Patients</h3>
            {/* <span className="text-[30px] font-bold text-[var(--cyan)]">{users.patients}</span> */}
            <span className="text-[30px] font-bold text-[var(--cyan)]">30</span>
        </div>
        <div className="bg-white shadow-[0px_0px_10px_#00000021] py-4 rounded-lg flex flex-col items-center gap-[1rem]">
            <h3 className="text-[var(--dark-blue)] font-bold text-3xl">Doctors</h3>
            {/* <span className="text-[30px] font-bold text-[var(--cyan)]">{users.doctors}</span> */}
            <span className="text-[30px] font-bold text-[var(--cyan)]">30</span>
        </div>
        <div className="bg-white shadow-[0px_0px_10px_#00000021] py-4 rounded-lg flex flex-col items-center gap-[1rem]">
            <h3 className="text-[var(--dark-blue)] font-bold text-3xl">Pharmacists</h3>
            {/* <span className="text-[30px] font-bold text-[var(--cyan)]">{users.pharmacists}</span> */}
            <span className="text-[30px] font-bold text-[var(--cyan)]">30</span>
        </div>
        <div className="bg-white shadow-[0px_0px_10px_#00000021] py-4 rounded-lg flex flex-col items-center gap-[1rem]">
            <h3 className="text-[var(--dark-blue)] font-bold text-3xl">Nurse</h3>
            {/* <span className="text-[30px] font-bold text-[var(--cyan)]">{users.nurse}</span> */}
            <span className="text-[30px] font-bold text-[var(--cyan)]">30</span>
        </div>
        <div className="bg-white shadow-[0px_0px_10px_#00000021] py-4 rounded-lg flex flex-col items-center gap-[1rem]">
            <h3 className="text-[var(--dark-blue)] font-bold text-3xl">Physiotherapist</h3>
            {/* <span className="text-[30px] font-bold text-[var(--cyan)]">{users.physiotherapist}</span> */}
            <span className="text-[30px] font-bold text-[var(--cyan)]">30</span>
        </div>
        <div className="bg-white shadow-[0px_0px_10px_#00000021] py-4 rounded-lg flex flex-col items-center gap-[1rem]">
            <h3 className="text-[var(--dark-blue)] font-bold text-3xl">Delivery agents</h3>
            {/* <span className="text-[30px] font-bold text-[var(--cyan)]">{users.delivery_agents}</span> */}
            <span className="text-[30px] font-bold text-[var(--cyan)]">30</span>
        </div>
    </div>
    </div>
        {/* Top Doctors  */}
        <div className="my-[2rem] border-[var(--dark-blue)]">
    <h2 className="text-[var(--text-color)] font-medium text-[30px]">Top Doctors</h2>
    <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-[2rem] pt-[2rem] md:px-[5rem] px-[2rem]">
        {/* {doctors?.length >0 && doctors.map((doctor)=>{
                    <div className="bg-white shadow-[0px_0px_10px_#00000021] py-4 rounded-lg flex flex-col items-center gap-[1rem]">
                    <h3 className="text-[var(--dark-blue)] font-bold text-3xl">{doctor.name}</h3>
                    <h3 className="text-[var(--dark-blue)] font-bold text-2xl">Total consultations:</h3>
                    <span className="text-[30px] font-bold text-[var(--cyan)]">{doctor.total_consultations}</span>
                </div>
        })} */}
        <div className="bg-white shadow-[0px_0px_10px_#00000021] py-4 rounded-lg flex flex-col items-center gap-[1rem]">
            <h3 className="text-[var(--dark-blue)] font-bold text-3xl">Dr.Ali </h3>
            <h3 className="text-[var(--dark-blue)] font-bold text-2xl">Total consultations:</h3>
            <span className="text-[30px] font-bold text-[var(--cyan)]">30</span>
        </div>
    </div>
    </div>
    {/* consultations  */}
    <div className="my-[2rem] border-[var(--dark-blue)]">
    <h2 className="text-[var(--text-color)] font-medium text-[30px]">Consultations</h2>
    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-[2rem] pt-[2rem] md:px-[5rem] px-[2rem]">
        <div className="bg-white shadow-[0px_0px_10px_#00000021] py-4 rounded-lg flex flex-col items-center gap-[1rem]">
            <h3 className="text-[var(--dark-blue)] font-bold text-3xl">Total</h3>
            {/* <span className="text-[30px] font-bold text-[var(--cyan)]">{consultations.total}</span> */}
            <span className="text-[30px] font-bold text-[var(--cyan)]">30</span>
        </div>
        <div className="bg-white shadow-[0px_0px_10px_#00000021] py-4 rounded-lg flex flex-col items-center gap-[1rem]">
            <h3 className="text-[var(--dark-blue)] font-bold text-3xl">Completed</h3>
            {/* <span className="text-[30px] font-bold text-[var(--cyan)]">{consultations.completed}</span> */}
            <span className="text-[30px] font-bold text-[var(--cyan)]">30</span>
        </div>
        <div className="bg-white shadow-[0px_0px_10px_#00000021] py-4 rounded-lg flex flex-col items-center gap-[1rem]">
            <h3 className="text-[var(--dark-blue)] font-bold text-3xl">Cancelled</h3>
            {/* <span className="text-[30px] font-bold text-[var(--cyan)]">{consultations.cancelled}</span> */}
            <span className="text-[30px] font-bold text-[var(--cyan)]">30</span>
        </div>
    </div>
    </div>
    {/* orders  */}
    <div className="my-[2rem] border-[var(--dark-blue)]">
    <h2 className="text-[var(--text-color)] font-medium text-[30px]">Orders</h2>
    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-[2rem] pt-[2rem] md:px-[5rem] px-[2rem]">
        <div className="bg-white shadow-[0px_0px_10px_#00000021] py-4 rounded-lg flex flex-col items-center gap-[1rem]">
            <h3 className="text-[var(--dark-blue)] font-bold text-3xl">Total</h3>
            {/* <span className="text-[30px] font-bold text-[var(--cyan)]">{orders.total}</span> */}
            <span className="text-[30px] font-bold text-[var(--cyan)]">30</span>
        </div>
        <div className="bg-white shadow-[0px_0px_10px_#00000021] py-4 rounded-lg flex flex-col items-center gap-[1rem]">
            <h3 className="text-[var(--dark-blue)] font-bold text-3xl">Delivered</h3>
            {/* <span className="text-[30px] font-bold text-[var(--cyan)]">{orders.delivered}</span> */}
            <span className="text-[30px] font-bold text-[var(--cyan)]">30</span>
        </div>
        <div className="bg-white shadow-[0px_0px_10px_#00000021] py-4 rounded-lg flex flex-col items-center gap-[1rem]">
            <h3 className="text-[var(--dark-blue)] font-bold text-3xl">Pending</h3>
            {/* <span className="text-[30px] font-bold text-[var(--cyan)]">{orders.pending}</span> */}
            <span className="text-[30px] font-bold text-[var(--cyan)]">30</span>
        </div>
    </div>
    </div>
    {/* documents  */}
    <div className="my-[2rem] border-[var(--dark-blue)]">
    <h2 className="text-[var(--text-color)] font-medium text-[30px]">Documents</h2>
    <div className="pt-[2rem] md:px-[5rem] px-[2rem] w-[50%] mx-[auto]">
        <div className="bg-white shadow-[0px_0px_10px_#00000021] py-4 rounded-lg flex flex-col items-center gap-[1rem]">
            <h3 className="text-[var(--dark-blue)] font-bold text-3xl">Pending documents</h3>
            {/* <span className="text-[30px] font-bold text-[var(--cyan)]">{pending_documents}</span> */}
            <span className="text-[30px] font-bold text-[var(--cyan)]">30</span>
        </div>
    </div>
    </div>
    </>
  )
}

export default Statistics
