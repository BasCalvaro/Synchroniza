import React from "react";

const FloorPlanViewer = ({ plans, viewer }) => {
  const handleFloorClick = (plan) => {
    viewer.plans.goTo(0, plan.expressID); // Cambia al plano seleccionado
  };

  return (
    <div>
      <h2>Seleccione un piso:</h2>
      <div>
        {plans.map((plan) => (
          <button key={plan.expressID} onClick={() => handleFloorClick(plan)}>
            {plan.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FloorPlanViewer;