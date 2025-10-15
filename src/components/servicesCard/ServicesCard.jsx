const ServicesCard = ({service}) => {
  return (
    <div className="flex flex-col justify-center items-center px-[3rem] py-[2rem] border-[1px] border-[var(--card-border)] rounded-[10px]">
        {service.img}
        <h3 className="md:text-[25px] text-[20px] font-bold mt-[1rem] mb-[0.5rem]">{service.for}</h3>
        <p className="text-[20px]">{service.desc}</p>
    </div>
  )
}

export default ServicesCard
