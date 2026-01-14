import FAIDCard from "./FAIDCard";

const FAID = () => {
  const faid = [
    {
      title: "CPR Basics",
      desc: "Check responsiveness, call for help, push hard and fast on the chest.",
    },
    {
      title: "Bleeding Control",
      desc: "Put pressure on the wound with a clean cloth until bleeding stops.",
    },
    {

      title: "Burn Care",
      desc: "Cool with running water, cover with a clean, non-fluffy dressing.",
    },
    {
      title: "Choking Response",
      desc: "If coughing fails, give quick abdominal thrusts until the object comes out or help arrives.",
    },
    {
      title: "Shock Recognition",
      desc: "Lay them flat, raise legs if safe, keep warm, call for help.",
    },
    {
      title: "Poisoning/Ingestion",
      desc: "Do not vomit; call poison control or emergency services and share what was taken.",
    },
  ];
  return (
    <div className="md:px-[3rem] px-[1.5rem] md:py-[1.5rem] py-[0.5rem] text-center">
      <h2 className="text-3xl font-bold text-[var(--dark-blue)] mb-8 text-center">First Aids</h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-[3rem] gap-[1.5rem]">
      {faid.map((item,index)=>(
        <FAIDCard key={index} item={item}/>
      ))}
      </div>
    </div>
  );
};

export default FAID;
