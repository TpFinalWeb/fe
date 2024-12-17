import React, { useState } from "react";
import HeaderMain from "../../components/headerMain.tsx";
import Footer from "../../components/footer.tsx";
import Chart from "chart.js/auto";
import { Line, Bar, Pie } from "react-chartjs-2";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

function Genres() {

  const [openPopUp, setOpenPopUp] = useState(false)
  const [popUpContent, setPopUpContent] = useState({ title: "", description: "" });

  const handleOpenPopUp = (title: string, description: string) => {
    setPopUpContent({ title, description });
    setOpenPopUp(true);
  };

  const data = {

    labels: ["Go", "Python", "Kotlin", "JavaScript", "R", "Swift"],
    datasets: [ 
      {
        label: "# of Votes",
        data: [35, 25, 22, 20, 18, 15],
        backgroundColor: [
          "#007D9C",
          "#244D70",
          "#D123B3",
          "#F7E018",
          "#FFFFFF",
          "#FE452A",
        ],
        borderColor: ["rgba(0,0,0,1)"],
        borderWidth: 1,
      },
    ],
  };

  const descGraph1 = `
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
  molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
  numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
  optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
  obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
  nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
  tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
  quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
  sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
  recusandae alias error harum maxime adipisci amet laborum. Perspiciatis 
  minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit 
  !
  `

  const descGraph2 = `
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
  molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
  numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
  optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
  obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
  nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
  tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
  quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
  sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
  recusandae alias error harum maxime adipisci amet laborum. Perspiciatis 
  minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit 
  !
  `

  const descGraph3 = `
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
  molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
  numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
  optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
  obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
  nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
  tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
  quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
  sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
  recusandae alias error harum maxime adipisci amet laborum. Perspiciatis 
  minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit 
  !
  `

  return (
    <div className="min-h-screen flex flex-col">
        <HeaderMain />
        <main className="flex-1 bg-teal-50 flex flex-col items-center justify-center p-8 ">
            <h2 className="text-2xl font-bold text-teal-700 mb-6 font-mono mb-10">
                Visualisation des Données de genres
            </h2>
            <div className="flex flex-wrap justify-center gap-12 mt-10">
                <div className="bg-white shadow-md rounded-lg p-10 w-[500px] hover:scale-105 hover:shadow-lg cursor-pointer" onClick={() => handleOpenPopUp("Grpahique 1",descGraph1)}>
                    <h3 className="text-center font-bold text-teal-700 mb-4 font-mono">
                        Graphique 1
                    </h3>
                    <Bar data={data} className=""/>
                </div>
                <div className="bg-white shadow-md rounded-lg p-10 w-[500px] hover:scale-105 hover:shadow-lg cursor-pointer" onClick={() => handleOpenPopUp("Grpahique 2",descGraph2)}>
                    <h3 className="text-center font-bold text-teal-700 mb-4 font-mono">
                        Graphique 2
                    </h3>
                    <Line data={data}/>
                </div>
                <div className="bg-white shadow-md shadow-md rounded-lg p-14 w-[500px] hover:scale-105 hover:shadow-lg cursor-pointer" onClick={() => handleOpenPopUp("Grpahique 3",descGraph3)}>
                    <h3 className="text-center font-bold text-teal-700 mb-4 font-mono">
                        Graphique 3
                    </h3>
                    <Pie data={data} />
                </div>
            </div>
        </main>
        <Footer />

        {openPopUp && (
          <div className="fixed bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl p-20 px-10">  
              <h2 className="text-xl font-bold text-teal-700 mb-4 font-mono">
                {popUpContent.title}
              </h2> 
              <p className="mb-6 text-gray-700">{popUpContent.description}</p>
              <button onClick={() => setOpenPopUp(false)} className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 font-mono">
                Fermer
              </button>
            </div>
          </div>
        )}  
    </div>
  );
}

export default Genres;
