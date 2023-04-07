import { TbUfo, TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import {
	GiWindmill,
	GiCampingTent,
	GiIsland,
	GiBoatFishing,
	GiCastle,
	GiCactus,
	GiCaveEntrance,
	GiBarn,
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { MdOutlineVilla } from 'react-icons/md';
import { BsFire } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';

export const categories = [
	{
		title: 'Beach',
		icon: TbBeach,
		subtitle: 'This property is close to the beach!',
	},
	{
		title: 'Camping',
		icon: GiCampingTent,
		subtitle: 'Enjoy a camping experience!',
	},
	{
		title: 'Desert',
		icon: GiCactus,
		subtitle: 'This property is in the desert!',
	},
	{
		title: 'Modern',
		icon: MdOutlineVilla,
		subtitle: 'This property is modern!',
	},
	{
		title: 'Trending',
		icon: BsFire,
		subtitle: 'This property is popular!',
	},
	{
		title: 'OMG!',
		icon: TbUfo,
		subtitle: 'This property is amazing!',
	},
	{
		title: 'Mountains',
		icon: TbMountain,
		subtitle: 'This property is close to mountains!',
	},
	{
		title: 'WindMills',
		icon: GiWindmill,
		subtitle: 'This property has windmills!',
	},
	{
		title: 'Pools',
		icon: TbPool,
		subtitle: 'This property has a pool!',
	},
	{
		title: 'Islands',
		icon: GiIsland,
		subtitle: 'This property is on an island!',
	},
	{
		title: 'Lake',
		icon: GiBoatFishing,
		subtitle: 'This property is close to a lake!',
	},
	{
		title: 'Castles',
		icon: GiCastle,
		subtitle: 'This property is in a castle!',
	},
	{
		title: 'Skiing',
		icon: FaSkiing,
		subtitle: 'This property has skiing activities!',
	},
	{
		title: 'Cave',
		icon: GiCaveEntrance,
		subtitle: 'This property is in a cave!',
	},
	{
		title: 'Barn',
		icon: GiBarn,
		subtitle: 'This property is in a barn!',
	},
	{
		title: 'Lux',
		icon: IoDiamond,
		subtitle: 'This property is luxurious!',
	},
];

export const titledCategories = categories.map(item => item.title);
