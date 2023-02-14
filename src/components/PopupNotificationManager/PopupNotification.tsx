import {useRemoveNotification} from 'hooks/useRemoveNotification';
import {ReactNode} from 'react';
import {IconType} from 'react-icons';
import {MdClose, MdOutlineCheckCircle, MdOutlineError, MdOutlineInfo, MdOutlineWarning} from 'react-icons/md';
import {NotificationData, NotificationType} from 'state/notifications';


type Props = {
    data: NotificationData,
};


function getTitle(notificationType: NotificationType): ReactNode {
    type TitleData = {
        title: string;
        icon: IconType;
        color: string;
    }

    const TitlesData: Record<NotificationType, TitleData> = {
        [NotificationType.INFORMATION]: {
            title: 'Information',
            icon: MdOutlineInfo,
            color: 'text-gray-600',
        },
        [NotificationType.SUCCESS]: {
            title: 'Success',
            icon: MdOutlineCheckCircle,
            color: 'text-green-600',
        },
        [NotificationType.WARNING]: {
            title: 'Warning',
            icon: MdOutlineWarning,
            color: 'text-yellow-600',
        },
        [NotificationType.ERROR]: {
            title: 'Error',
            icon: MdOutlineError,
            color: 'text-red-600',
        },
    };

    const titleData = TitlesData[notificationType];

    return (
        <div className={'flex flex-row items-center ' + titleData.color}>
            <titleData.icon className="text-xl"/>
            <span className="ml-2">{titleData.title}</span>
        </div>
    );
}


export default function PopupNotification({data}: Props) {
    const title = getTitle(data.type);

    const removeNotification = useRemoveNotification();

    return (
        <div className="drop-shadow-2xl m-2 border-2 rounded-md bg-slate-50 w-[300px]">
            <div className="flex p-2 border-b justify-between">
                {title}
                <button onClick={() => removeNotification(data.id)}><MdClose/></button>
            </div>
            <div className="p-2">
                {data.context}
            </div>
        </div>
    );
}
