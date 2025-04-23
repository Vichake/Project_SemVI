import EquipmentCard from './EquipmentCard';

const EquipmentGrid = ({ equipmentList, onSelectModel }) => (
  <div className="farmgear-equipment-grid">
    {equipmentList.map(equipment => (
      <EquipmentCard key={equipment.id} equipment={equipment} onSelectModel={onSelectModel} />
    ))}
  </div>
);

export default EquipmentGrid;
