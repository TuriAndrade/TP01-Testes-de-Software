import Image from "next/image";

export default function UserCard({ name, nAvaliable, ...rest }) {
  return (
    <div {...rest} className="userCard">
      <div className="userCard__background"></div>
      <div className="userCard__profilePictureBox">
        <Image
          src="/defaultProfilePicture.webp"
          alt="Profile Picture"
          layout="fill"
        />
      </div>
      <div className="userCard__textBox userCard__usernameBox">
        <div className="userCard__textLabel">Nome:</div>
        <div className="userCard__textValue">{name}</div>
      </div>
      <div className="userCard__textBox userCard__emailBox">
        <div className="userCard__textLabel">
          {nAvaliable == 1
            ? `1 figurinha disponível!`
            : `${nAvaliable} figurinhas disponíveis!`}
        </div>
      </div>
    </div>
  );
}
