import { root } from './data';

const Menu = ({ data }) => {
  return (
    <>
      {data.map((m, i) => {
        return (
          <div key={i}>
            {m.id}
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', left: 20 }}>{m.children && <Menu data={m.children} />}</div>
          </div>
        );
      })}
    </>
  );
};
const Navbars = () => {
  return (
    <div>
      <Menu data={root} />
    </div>
  );
};

export default Navbars;