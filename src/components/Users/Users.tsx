import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store"
import { getAllUsers } from "../../store/users/thunks";
import { addNew } from '../../store/conversations/thunks';
import { toggleUsersDisplayed } from "../../store/app";
import router from "next/router";

export function Users() {
  const dispatch = useAppDispatch();
  const { entities } = useSelector((state: RootState) => state.users);
  const { areUsersDisplayed } = useSelector((state: RootState) => state.app);   
  const { user } = useSelector((state: RootState) => state.auth);

  const users: User[] = useMemo(() => Object.values(entities), []);

  const addConversation = async (userId) => {
    await dispatch(toggleUsersDisplayed({}))

    const newConversationId = Date.now();

    await dispatch(addNew({
      id: newConversationId,
      senderId: user.id,
      senderNickname: user.nickname,
      recipientId: userId,
      recipientNickname: users.find(user => user.id === userId).nickname,
      lastMessageTimestamp: Date.now()
    }))

    router.push(`/conversations/${newConversationId}`);
  }

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div id="users" className={`${areUsersDisplayed && 'displayed'}`}>
      {users.length > 0 ? 
          users.map(user => (
            <div
              className="user"
              key={user.id}
              onClick={() => addConversation(user.id)}
            >
              <p>{user.nickname}</p>
            </div>
          )
      ) : (
        <p>Aucun utilisateur</p>
      )}
    </div>
  )
}