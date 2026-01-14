const FAIDCard = ({item}) => {
    return (
      <div className="flex flex-col justify-center items-center px-[3rem] py-[2rem] shadow-[0px_0px_10px_#eaeaea85] border-[1px] border-[var(--card-border)] rounded-[10px]">
          <h3 className="md:text-[25px] text-[20px] text-[var(--dark-blue)] font-medium mt-[1rem] mb-[0.5rem]">{item.title}</h3>
          <p className="text-[20px] text-[var(--text-color)] font-bold">{item.desc}</p>
      </div>
    )
  }
  
  export default FAIDCard
  