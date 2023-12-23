type Props = {
  label: string;
};

function NavbarItem({ label }: Props) {
  return (
    <div className="text-white hover:text-gray-300 cursor-pointer">{label}</div>
  );
}

export default NavbarItem;
