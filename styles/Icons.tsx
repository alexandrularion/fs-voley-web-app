import styled, { css } from 'styled-components';
import {
  IoHeart,
  IoSearchOutline,
  IoEyeOutline,
  IoCloudUploadOutline,
  IoReorderFourSharp,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoArrowBackCircleOutline,
  IoDocumentTextOutline,
  IoBriefcaseOutline,
  IoPeopleOutline,
  IoLockClosedOutline,
  IoLogoGoogle,
  IoNotificationsOutline,
  IoGridOutline,
  IoNotifications,
  IoSettingsOutline,
  IoCloseOutline,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLogInOutline,
  IoLogoInstagram,
  IoLogOutOutline,
  IoBusinessOutline,
  IoHeartOutline,
  IoPaperPlane,
  IoReorderFour,
  IoCashOutline,
  IoFilterCircleOutline,
  IoCode,
  IoHelpBuoyOutline,
  IoChevronDownOutline,
  IoCloseCircleOutline,
  IoCheckmarkCircleOutline,
  IoAlertCircleOutline,
  IoPersonOutline,
  IoCalendarOutline,
  IoSettings,
  IoCardOutline,
  IoSadOutline,
  IoHappyOutline,
  IoFunnelOutline,
  IoNewspaperOutline,
  IoTrashOutline,
  IoPencilSharp,
  IoCopyOutline,
  IoCheckmarkDone,
  IoGlobeOutline,
  IoLinkOutline,
  IoDownloadOutline,
  IoCheckmarkDoneOutline,
  IoList,
  IoCheckmarkCircle,
  IoPin,
  IoPerson,
  IoLockClosed,
  IoCameraOutline,
  IoBulb,
  IoPeople,
  IoLockOpen,
  IoAddOutline,
  IoInformationCircleOutline,
  IoLogoMicrosoft,
  IoLogoSkype,
  IoLogoSlack,
  IoBriefcase,
  IoMail,
  IoBusiness,
  IoSave,
  IoLocation,
  IoMenu,
  IoDocumentText,
  IoGrid,
  IoPlanet,
  IoBarcodeOutline,
  IoRocket,
  IoCloseCircle,
  IoArrowUp,
} from 'react-icons/io5';
import { device } from '../components/shared/DevicesBreakpoints';
import { FaTelegram, FaFacebookSquare } from 'react-icons/fa';
import { RiMoneyDollarBoxFill, RiMoneyDollarCircleLine } from 'react-icons/ri';
import { Desktop, Laptop, Mobile, SmallMobile, SmallTablet, Tablet } from './Interfaces';
import { BiLoaderCircle } from 'react-icons/bi';

export type TIconSizes = [Laptop?, Desktop?, Tablet?, SmallTablet?, Mobile?, SmallMobile?];
interface IIconProps {
  sizes?: [Laptop?, Desktop?, Tablet?, SmallTablet?, Mobile?, SmallMobile?];
  color?: string;
}

const defaultIconStyle = css<IIconProps>`
  color: ${({ color }) => color || '#000'};
  width: ${({ sizes }) => sizes?.[0]};
  height: ${({ sizes }) => sizes?.[0]};
  transition: all 0.2s ease-in-out;

  @media ${device.desktop} {
    width: ${({ sizes }) => sizes?.[1]};
    height: ${({ sizes }) => sizes?.[1]};
  }
  @media ${device.tablet} {
    width: ${({ sizes }) => sizes?.[2]};
    height: ${({ sizes }) => sizes?.[2]};
  }
  @media ${device.smallTablet} {
    width: ${({ sizes }) => sizes?.[3]};
    height: ${({ sizes }) => sizes?.[3]};
  }
  @media ${device.mobile} {
    width: ${({ sizes }) => sizes?.[4]};
    height: ${({ sizes }) => sizes?.[4]};
  }
  @media ${device.smallMobile} {
    width: ${({ sizes }) => sizes?.[5]};
    height: ${({ sizes }) => sizes?.[5]};
  }
`;

export const SaveIcon = styled(IoSave)<IIconProps>`
  ${defaultIconStyle}
`;
export const MissionIcon = styled(IoRocket)<IIconProps>`
  ${defaultIconStyle}
`;
export const VoucherIcon = styled(IoBarcodeOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const BriefcaseFillIcon = styled(IoBriefcase)<IIconProps>`
  ${defaultIconStyle}
`;
export const MicrosoftIcon = styled(IoLogoMicrosoft)<IIconProps>`
  ${defaultIconStyle}
`;
export const SkypeIcon = styled(IoLogoSkype)<IIconProps>`
  ${defaultIconStyle}
`;
export const SlackIcon = styled(IoLogoSlack)<IIconProps>`
  ${defaultIconStyle}
`;
export const LinkIcon = styled(IoLinkOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const PlusIcon = styled(IoAddOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const InfoIcon = styled(IoInformationCircleOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const LockedIcon = styled(IoLockClosed)<IIconProps>`
  ${defaultIconStyle}
`;
export const UnlockedIcon = styled(IoLockOpen)<IIconProps>`
  ${defaultIconStyle}
`;
export const CameraIcon = styled(IoCameraOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const SignOutIcon = styled(IoLogOutOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const PinIcon = styled(IoPin)<IIconProps>`
  ${defaultIconStyle}
`;
export const SortIcon = styled(IoList)<IIconProps>`
  ${defaultIconStyle}
`;
export const DoubleCheckIcon = styled(IoCheckmarkDoneOutline)<IIconProps>`
  ${defaultIconStyle}
`;

export const DownloadIcon = styled(IoDownloadOutline)<IIconProps>`
  ${defaultIconStyle}
`;

export const GlobeIcon = styled(IoGlobeOutline)<IIconProps>`
  ${defaultIconStyle}
`;

export const PlanetIcon = styled(IoPlanet)<IIconProps>`
  ${defaultIconStyle}
`;

export const OrderIcon = styled(IoReorderFourSharp)<IIconProps>`
  ${defaultIconStyle}
`;

export const TrashIcon = styled(IoTrashOutline)<IIconProps>`
  ${defaultIconStyle}
`;

export const LightBulbIcon = styled(IoBulb)<IIconProps>`
  ${defaultIconStyle}
`;

export const MenuIcon = styled(IoMenu)<IIconProps>`
  ${defaultIconStyle}
`;

export const PenIcon = styled(IoPencilSharp)<IIconProps>`
  ${defaultIconStyle}
`;

export const SearchIcon = styled(IoSearchOutline)<IIconProps>`
  ${defaultIconStyle}
`;

export const ArrowLeftIcon = styled(IoChevronBackOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const ArrowRightIcon = styled(IoChevronForwardOutline)<IIconProps>`
  ${defaultIconStyle}
`;

export const ArticlesIcon = styled(IoDocumentTextOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const TitleIcon = styled(IoDocumentText)<IIconProps>`
  ${defaultIconStyle}
`;
export const EyeIcon = styled(IoEyeOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const UploadIcon = styled(IoCloudUploadOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const BackIcon = styled(IoArrowBackCircleOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const ArrowDownIcon = styled(IoChevronDownOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const CashIcon = styled(IoCashOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const FilterIcon = styled(IoFunnelOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const FavoriteIcon = styled(IoHeartOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const ArrowUpIcon = styled(IoArrowUp)<IIconProps>`
  ${defaultIconStyle}
`;
export const FavoriteFilledIcon = styled(IoHeart)<IIconProps>`
  ${defaultIconStyle}
`;
export const ShareIcon = styled(IoPaperPlane)<IIconProps>`
  ${defaultIconStyle}
`;
export const LocationIcon = styled(IoLocation)<IIconProps>`
  ${defaultIconStyle}
`;
export const CompanyIcon = styled(IoBusinessOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const BriefcaseIcon = styled(IoBriefcaseOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const CategoryIcon = styled(IoReorderFour)<IIconProps>`
  ${defaultIconStyle}
`;
export const CheckedIcon = styled(IoCheckmarkCircleOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const CheckedFillllIcon = styled(IoCheckmarkCircle)<IIconProps>`
  ${defaultIconStyle}
`;
export const CheckedFillIcon = styled(IoCheckmarkCircle)<IIconProps>`
  ${defaultIconStyle}
`;
export const SimpleCheckedIcon = styled(IoCheckmarkDone)<IIconProps>`
  ${defaultIconStyle}
`;
export const WarningIcon = styled(IoAlertCircleOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const FacebookIcon = styled(FaFacebookSquare)<IIconProps>`
  ${defaultIconStyle}
`;
export const LinkedinIcon = styled(IoLogoLinkedin)<IIconProps>`
  ${defaultIconStyle}
`;
export const TwitterIcon = styled(IoLogoTwitter)<IIconProps>`
  ${defaultIconStyle}
`;
export const GoogleIcon = styled(IoLogoGoogle)<IIconProps>`
  ${defaultIconStyle}
`;
export const EmailIcon = styled(IoMail)<IIconProps>`
  ${defaultIconStyle}
`;
export const PasswordIcon = styled(IoLockClosedOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const PasswordFillIcon = styled(IoLockClosed)<IIconProps>`
  ${defaultIconStyle}
`;
export const InstagramIcon = styled(IoLogoInstagram)<IIconProps>`
  ${defaultIconStyle}
`;
export const TelegramIcon = styled(FaTelegram)<IIconProps>`
  ${defaultIconStyle}
`;

export const CloseIcon = styled(IoCloseOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const CloseFillIcon = styled(IoCloseCircle)<IIconProps>`
  ${defaultIconStyle}
`;
export const PaymentIcon = styled(IoCardOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const BlogIcon = styled(IoNewspaperOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const SadIcon = styled(IoSadOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const HappyIcon = styled(IoHappyOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const DollarIcon = styled(RiMoneyDollarBoxFill)<IIconProps>`
  ${defaultIconStyle}
`;
export const DollarOutlineIcon = styled(RiMoneyDollarCircleLine)<IIconProps>`
  ${defaultIconStyle}
`;
export const CloseCircleIcon = styled(IoCloseCircleOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const FilterCircleIcon = styled(IoFilterCircleOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const VerifiedCircleIcon = styled(IoCheckmarkCircleOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const LoginIcon = styled(IoLogInOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const CodeIcon = styled(IoCode)<IIconProps>`
  ${defaultIconStyle}
`;
export const HelpIcon = styled(IoHelpBuoyOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const SettignsIcon = styled(IoSettingsOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const NotificationsEmptyIcon = styled(IoNotificationsOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const NotificationsFullIcon = styled(IoNotifications)<IIconProps>`
  ${defaultIconStyle}
`;
export const GridIcon = styled(IoGridOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const GridFilledIcon = styled(IoGrid)<IIconProps>`
  ${defaultIconStyle}
`;
export const PeopleIcon = styled(IoPeopleOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const PeopleFillIcon = styled(IoPeople)<IIconProps>`
  ${defaultIconStyle}
`;
export const PersonIcon = styled(IoPersonOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const PersonFillIcon = styled(IoPerson)<IIconProps>`
  ${defaultIconStyle}
`;
export const CalendarIcon = styled(IoCalendarOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const SettingsFilledIcon = styled(IoSettings)<IIconProps>`
  ${defaultIconStyle}
`;
export const DocumentIcon = styled(IoDocumentTextOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const DocumentFillIcon = styled(IoDocumentText)<IIconProps>`
  ${defaultIconStyle}
`;
export const CopyIcon = styled(IoCopyOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const BuildIcon = styled(IoBusiness)<IIconProps>`
  ${defaultIconStyle}
`;
export const SearchOutline = styled(IoSearchOutline)<IIconProps>`
  ${defaultIconStyle}
`;
export const LoadingButtonIcon = styled(BiLoaderCircle)<IIconProps>`
  ${defaultIconStyle}
`;
