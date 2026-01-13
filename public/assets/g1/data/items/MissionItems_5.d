//#####################################################################
//##
//##
//##							KAPITEL 5
//##
//##
//#####################################################################

//---------------------------------------------------------------------
// Skizze des Orctempels
//---------------------------------------------------------------------

INSTANCE ItWrTemplemap(C_Item)
{
	name 				=	"Karta";

	mainflag 			=	ITEM_KAT_DOCS;
	flags 				=	ITEM_MISSION;

	value 				=	30;

	visual 				=	"ItWr_Map_01.3DS";
	material 			=	MAT_LEATHER;

	scemeName			=	"MAP";
	on_state[0]			=	UseTemplemap;

	description			= "Szkic œwiäntyni";
	TEXT[4]				= NAME_Value;					COUNT[4]	= value;
};

	FUNC VOID UseTemplemap()
	{
		var int nDocID;

		nDocID = 	Doc_CreateMap	()			  ;							// DocManager
//					Doc_SetLevel	( nDocID,	"ORCTEMPEL.ZEN" );		// Positionsanzeige funzt nicht!
					Doc_SetPages	( nDocID, 1 );
					Doc_SetPage 	( nDocID, 0, "Map_Temple.tga", 1	);  //  1 -> DO NOT SCALE
					Doc_Show		( nDocID 	);
	};


//---------------------------------------------------------------------
//	Alarmhorn der Orks
//---------------------------------------------------------------------
INSTANCE ItMiAlarmhorn (C_Item)
{
	name 				=	"Räg";

	mainflag 			=	ITEM_KAT_NONE;
	flags				=	ITEM_MISSION;

	value 				=	9;

	visual 				=	"ItMi_Alarmhorn_01.3DS";
	material 			=	MAT_WOOD;

	scemeName			=	"HORN";

	description			= name;
	//TEXT[0]			= "";
	////COUNT[0]		= ;
	//TEXT[1]			= "";
	////COUNT[1]		= ;
	//TEXT[2]			= "";
	//COUNT[2]			= ;
	//TEXT[3] 			= "";
	//COUNT[3]			= ;
	//TEXT[4]			= "";
	////COUNT[4]		= ;
	TEXT[5]				= NAME_Value;
	COUNT[5]			= value;
};

//---------------------------------------------------------------------
//	Statuette für Tür zum Alten Tempel
//---------------------------------------------------------------------
INSTANCE ItMi_Stuff_Idol_Sleeper_01 (C_Item)
{
	name 				=	"Posän¿ek";

	mainflag 			=	ITEM_KAT_NONE;
	flags 				=	ITEM_MISSION;

	value 				=	0;

	visual 				=	"ItMi_Stuff_Idol_Sleeper_01.3DS";
	material 			=	MAT_CLAY;

	description			=	name;
	TEXT[0]				= "Posän¿ek ze chopem";
	TEXT[1]				= "we masce kery niy ¿yje.";
	TEXT[2]				= "Kole maski szeœæ ¿ände³.";
};

//---------------------------------------------------------------------
//	Schläferschwert 1
//---------------------------------------------------------------------
INSTANCE Weltenspalter (C_Item) 
{	
	name 				=	"Rozcinacz œwiotäw";

	mainflag 			=	ITEM_KAT_NONE;
	flags 				=	ITEM_2HD_SWD|ITEM_MISSION;
	material 			=	MAT_METAL;

	value 				=	900;

	damageTotal			= 	90;
	damagetype			=	DAM_EDGE;
	range    			=  	140;		
	cond_atr[2]   		= 	ATR_STRENGTH;
	cond_value[2]  		= 	30;
	visual 				=	"ItMi_SleeperKey_01.3DS";
	description			= 	name;
	TEXT[0]				=	"Tyn miecz nale¿o³ do chopa kery zamiyni³ sie";
	TEXT[1]				=	"we ô¿ywieñca, kap³ona ôrkäw";
	TEXT[2]				=	"Niystety, po tych wszyskich lotach";
	TEXT[3]				=	"niy nadowo sie jus do u¿ytku!";
	TEXT[4]				=	"Mo¿no do sie go wykorzistaæ";
	TEXT[5]				=	"we inkszy sposäb.";
};

//---------------------------------------------------------------------
//	Schläferschwert 2
//---------------------------------------------------------------------
INSTANCE Lichtbringer (C_Item) 
{	
	name 				=	"Ôstrze Œwiat³a";

	mainflag 			=	ITEM_KAT_NONE;
	flags 				=	ITEM_2HD_SWD|ITEM_MISSION;	
	material 			=	MAT_METAL;

	value 				=	900;

	damageTotal			= 	90;
	damagetype			=	DAM_EDGE;
	range    			=  	140;		
	cond_atr[2]   		= 	ATR_STRENGTH;
	cond_value[2]  		= 	30;
	visual 				=	"ItMi_SleeperKey_01.3DS";
	description			= 	name;
	TEXT[0]				=	"Tyn miecz nale¿o³ do chopa kery zamiyni³ sie";
	TEXT[1]				=	"we ô¿ywieñca, kap³ona ôrków";
	TEXT[2]				=	"Niystety, po tych wszyskich lotach";
	TEXT[3]				=	"niy nadowo sie jus do u¿ytku!";
	TEXT[4]				=	"Mo¿no do sie go wykorzistaæ";
	TEXT[5]				=	"we inkszy sposäb.";
};

//---------------------------------------------------------------------
//	Schläferschwert 3
//---------------------------------------------------------------------
INSTANCE Zeitenklinge (C_Item) 
{	
	name 				=	"Ôstrze Casu";

	mainflag 			=	ITEM_KAT_NONE;
	flags 				=	ITEM_2HD_SWD|ITEM_MISSION;	
	material 			=	MAT_METAL;

	value 				=	900;

	damageTotal			= 	90;
	damagetype			=	DAM_EDGE;
	range    			=  	140;		
	cond_atr[2]   		= 	ATR_STRENGTH;
	cond_value[2]  		= 	30;
	visual 				=	"ItMi_SleeperKey_01.3DS";
	description			= 	name;
	TEXT[0]				=	"Tyn miecz nale¿o³ do chopa kery zamiyni³ sie";
	TEXT[1]				=	"we ô¿ywieñca, kap³ona ôrków";
	TEXT[2]				=	"Niystety, po tych wszyskich lotach";
	TEXT[3]				=	"niy nadowo sie jus do u¿ytku!";
	TEXT[4]				=	"Mo¿no do sie go wykorzistaæ";
	TEXT[5]				=	"we inkszy sposäb.";
};

//---------------------------------------------------------------------
//	Schläferschwert 4
//---------------------------------------------------------------------
INSTANCE Daemonenstreich (C_Item) 
{	
	name 				=	"Gniew Dioblisk";

	mainflag 			=	ITEM_KAT_NONE;
	flags 				=	ITEM_2HD_SWD|ITEM_MISSION;	
	material 			=	MAT_METAL;

	value 				=	900;

	damageTotal			= 	90;
	damagetype			=	DAM_EDGE;
	range    			=  	140;		
	cond_atr[2]   		= 	ATR_STRENGTH;
	cond_value[2]  		= 	30;
	visual 				=	"ItMi_SleeperKey_01.3DS";
	description			= 	name;
	TEXT[0]				=	"Tyn miecz nale¿o³ do chopa kery zamiyni³ sie";
	TEXT[1]				=	"we ô¿ywieñca, kap³ona ôrków.";
	TEXT[2]				=	"Niestety, po tych wszyskich lotach";
	TEXT[3]				=	"niy nadowo sie jus do u¿ytku!";
	TEXT[4]				=	"Mo¿no do sie go wykorzistaæ";
	TEXT[5]				=	"we inkszy sposäb.";
};

//---------------------------------------------------------------------
//	Schläferschwert 5
//---------------------------------------------------------------------
INSTANCE Bannklinge (C_Item) 
{	
	name 				=	"Wygnaniec";

	mainflag 			=	ITEM_KAT_NONE;
	flags 				=	ITEM_2HD_SWD|ITEM_MISSION;	
	material 			=	MAT_METAL;

	value 				=	900;

	damageTotal			= 	90;
	damagetype			=	DAM_EDGE;
	range    			=  	140;		
	cond_atr[2]   		= 	ATR_STRENGTH;
	cond_value[2]  		= 	30;
	visual 				=	"ItMi_SleeperKey_01.3DS";
	description			= 	name;
	TEXT[0]				=	"Tyn miecz nale¿o³ do chopa kery zamiyni³ sie";
	TEXT[1]				=	"we ô¿ywieñca, kap³ona ôrków.";
	TEXT[2]				=	"Niestety, po tych wszyskich lotach";
	TEXT[3]				=	"niy nadowo sie jus do u¿ytku!";
	TEXT[4]				=	"Mo¿no do sie go wykorzistaæ";
	TEXT[5]				=	"we inkszy sposäb.";
};

//---------------------------------------------------------------------
//	Schwert für den Untoten Ork-Hohepriester (unidentifiziert)
//---------------------------------------------------------------------
INSTANCE Mythrilklinge (C_Item) 
{	
	name 				=	"Przedziwny miecz";

	mainflag 			=	ITEM_KAT_NONE;
	flags 				=	ITEM_2HD_SWD|ITEM_MISSION;	
	material 			=	MAT_METAL;

	value 				=	900;

	damageTotal			= 	10;
	damagetype			=	DAM_EDGE;
	range    			=  	160;		
	cond_atr[2]   		= 	ATR_STRENGTH;
	cond_value[2]  		= 	30;
	visual 				=	"ItMw_2H_Sword_Sleeper_01.3DS";
	description			= 	name;
	TEXT[0]				=	"Pikny miecz.";
	TEXT[1]				=	"Ôstrze zdobiäm prastare runy.";
	TEXT[2]				=	"Mo¿no Xardasowi udo sie je ôdczytaæ!";
	TEXT[3]				=	"Teroski lepi go niy u¿ywaæ.";
};

//---------------------------------------------------------------------
//	Schwert für den Untoten Ork-Hohepriester (identifiziert)
//---------------------------------------------------------------------
instance Mythrilklinge01 (C_Item) 
{	
	name 				=	"URIZIEL";

	mainflag 			=	ITEM_KAT_NF;
	flags 				=	ITEM_2HD_SWD|ITEM_MISSION;	
	material 			=	MAT_METAL;

	value 				=	900;

	damageTotal			= 	90;
	damagetype			=	DAM_EDGE;
	range    			=  	180;		
	cond_atr[2]   		= 	ATR_STRENGTH;
	cond_value[2]  		= 	30;
	visual 				=	"ItMw_2H_Sword_Sleeper_01.3DS";

	description			= 	name;
	TEXT[0]				=	"Xardas godo, i¿e miecz nazywo sie URIZIEL.";
	TEXT[1]				=	"Szkoda, ¿e niy wodzionka.";

	TEXT[3]				=	NAME_Damage;				COUNT[3] =	damageTotal;
	TEXT[4] 			=	NAME_Str_needed;			COUNT[4] =	cond_value[2];
	TEXT[5]				=	NAME_Value;					COUNT[5] =	value;
};

//---------------------------------------------------------------------
//	Schwert für den Untoten Ork-Hohepriester (aufgeladen)
//---------------------------------------------------------------------
instance Mythrilklinge02 (C_Item) 
{	
	name 				=	"URIZIEL";

	mainflag 			=	ITEM_KAT_NF;
	flags 				=	ITEM_2HD_SWD|ITEM_MISSION;	
	material 			=	MAT_METAL;

	value 				=	10000;

//	damageType				=	DAM_EDGE|DAM_FIRE|DAM_MAGIC;//Templer sollten sofort tot sein
	damageType				=	DAM_FIRE|DAM_MAGIC;
//	damageType				=	DAM_MAGIC;
//	damage[DAM_INDEX_EDGE]	=	  1;						//Templer sollten sofort tot sein
	damage[DAM_INDEX_FIRE]	=	 30;
	damage[DAM_INDEX_MAGIC]	=	150;
	//damage[DAM_INDEX_MAGIC]	=	150;

	range    			=  	220;		
	cond_atr[2]   		= 	ATR_STRENGTH;
	cond_value[2]  		= 	30;
	visual 				=	"ItMw_2H_Sword_Sleeper_02.3DS";
	description			= 	name;
	TEXT[0]				=	"To je staro¿ytny miecz Uriziel.";
	TEXT[1]				= 	"Uriziel zosto³ magicznie na³adäwany.";
	TEXT[2]				=	NAME_Dam_Magic;			COUNT[2]	=	damage[DAM_INDEX_MAGIC];
	TEXT[3]				=	NAME_Dam_Fire;			COUNT[3]	=	damage[DAM_INDEX_FIRE];
	TEXT[4] 			=	NAME_Str_needed;		COUNT[4]	=	cond_value[2];
	TEXT[5]				=	NAME_Value;				COUNT[5]	=	value;
};

instance ITWE_1H_Mythrilklinge (C_Item) 
{	
	name 				=	"URIZIEL";

	mainflag 			=	ITEM_KAT_NF;
	flags 				=	ITEM_SWD|ITEM_MISSION;	
	material 			=	MAT_METAL;

	value 				=	10000;

//	damageType				=	DAM_EDGE|DAM_FIRE|DAM_MAGIC;//Templer sollten sofort tot sein
	damageType				=	DAM_FIRE|DAM_MAGIC;
//	damageType				=	DAM_MAGIC;
//	damage[DAM_INDEX_EDGE]	=	  1;						//Templer sollten sofort tot sein
	damage[DAM_INDEX_FIRE]	=	 30;
	damage[DAM_INDEX_MAGIC]	=	120;
	//damage[DAM_INDEX_MAGIC]	=	150;

	range    			=  	160;		
	cond_atr[2]   		= 	ATR_STRENGTH;
	cond_value[2]  		= 	30;
	visual 				=	"ItMw_2H_Sword_Sleeper_02.3DS";
	description			= 	name;
	TEXT[0]				=	"To staro¿ytny miecz Uriziel.";
	TEXT[1]				= 	"Uriziel zosto³ magicznie na³adäwany.";
	TEXT[2]				=	NAME_Dam_Magic;			COUNT[2]	=	damage[DAM_INDEX_MAGIC];
	TEXT[3]				=	NAME_Dam_Fire;			COUNT[3]	=	damage[DAM_INDEX_FIRE];
	TEXT[4] 			=	NAME_Str_needed;		COUNT[4]	=	cond_value[2];
	TEXT[5]				=	NAME_Value;				COUNT[5]	=	value;
};


instance ITWE_BOW_Mythrilklinge (C_Item) 
{	
	name 				=	"£UK URIZIEL";

	mainflag 			=	ITEM_KAT_NF;
	flags 				=	ITEM_BOW|ITEM_MISSION;	
	material 			=	MAT_METAL;

	value 				=	10000;

//	damageType				=	DAM_POINT|DAM_FIRE|DAM_MAGIC;//Templer sollten sofort tot sein
	munition				=	ItAmArrow;
	damageType				=	DAM_FIRE|DAM_MAGIC;
//	damageType				=	DAM_MAGIC;
	damage[DAM_INDEX_FIRE]	=	 30;
//	damage[DAM_POINT]		=	  1;						//Templer sollten sofort tot sein
	damage[DAM_INDEX_MAGIC]	=	110;
	//damage[DAM_INDEX_MAGIC]	=	150;

	cond_atr[2]   		= 	ATR_DEXTERITY;
	cond_value[2]  		= 	50;
	visual 				=	"ItRw_Bow_War_04.mms";
	description			= 	name;
	TEXT[0]				=	"Moc Uriziela zamkniynto we ³uku.";
	TEXT[1]				= 	"Kamiyñ wykono³ dobro robota.";
	TEXT[2]				=	NAME_Dam_Magic;			COUNT[2]	=	damage[DAM_INDEX_MAGIC];
	TEXT[3]				=	NAME_Dam_Fire;			COUNT[3]	=	damage[DAM_INDEX_FIRE];
	TEXT[4] 			=	NAME_Dex_needed;		COUNT[4]	=	cond_value[2];
	TEXT[5]				=	NAME_Value;				COUNT[5]	=	value;
};

instance ITWE_XBOW_Mythrilklinge (C_Item) 
{	
	name 				=	"Szlojdra URIZIEL";

	mainflag 			=	ITEM_KAT_NF;
	flags 				=	ITEM_CROSSBOW|ITEM_MISSION;	
	material 			=	MAT_METAL;

	value 				=	10000;

//	damageType				=	DAM_POINT|DAM_FIRE|DAM_MAGIC;//Templer sollten sofort tot sein
	munition			=	ItAmBolt;
	damageType				=	DAM_FIRE|DAM_MAGIC;
//	damageType				=	DAM_MAGIC;
	damage[DAM_INDEX_FIRE]	=	 30;
//	damage[DAM_POINT]		=	  1;						//Templer sollten sofort tot sein
	damage[DAM_INDEX_MAGIC]	=	130;
	//damage[DAM_INDEX_MAGIC]	=	150;

	cond_atr[2]   		= 	ATR_DEXTERITY;
	cond_value[2]  		= 	75;
	visual 				=	"ItRwCrossbow4.mms";
	description			= 	name;
	TEXT[0]				=	"Moc Uriziela zamkniynto we szlojdrze.";
	TEXT[1]				= 	"Kamiyñ wykono³ dobro robota.";
	TEXT[2]				=	NAME_Dam_Magic;			COUNT[2]	=	damage[DAM_INDEX_MAGIC];
	TEXT[3]				=	NAME_Dam_Fire;			COUNT[3]	=	damage[DAM_INDEX_FIRE];
	TEXT[4] 			=	NAME_Dex_needed;		COUNT[4]	=	cond_value[2];
	TEXT[5]				=	NAME_Value;				COUNT[5]	=	value;
};

//---------------------------------------------------------------------
//	URIZIEL, mit entferntem Stein
//---------------------------------------------------------------------
instance Mythrilklinge03 (C_Item) 
{	
	name 				=	"URIZIEL";

	mainflag 			=	ITEM_KAT_NF;
	flags 				=	ITEM_2HD_SWD|ITEM_MISSION;	
	material 			=	MAT_METAL;

	value 				=	900;

	damageTotal			= 	90;
	damagetype			=	DAM_EDGE;
	range    			=  	180;		
	cond_atr[2]   		= 	ATR_STRENGTH;
	cond_value[2]  		= 	30;
	visual 				=	"ItMw_2H_Sword_Sleeper_01.3DS";

	description			= 	name;
	TEXT[0]				=	"Magiczny kryszto³ zosto³ usuniynty ze miecza.";
	TEXT[1]				=	"Je to durch fest potyn¿no broñ,";
	TEXT[2]				=	"ino pozbawiono mocy magicznych.";
	TEXT[3]				=	NAME_Damage;				COUNT[3] =	damageTotal;
	TEXT[4] 			=	NAME_Str_needed;			COUNT[4] =	cond_value[2];
	TEXT[5]				=	NAME_Value;					COUNT[5] =	value;
};

//---------------------------------------------------------------------
//	Schriftrolle, um Schwert für den untoten Ork-Hohepriester zu laden
//---------------------------------------------------------------------
INSTANCE Scroll4Milten (C_Item)
{	
	name 				=	"Przekoz energii";

	mainflag 			=	ITEM_KAT_DOCS;
	flags 				=	ITEM_MISSION;

	value 				=	15;

	visual 				=	"ItWrScroll.3DS";
	material 			=	MAT_LEATHER;

//	scemeName			=	"MAP";
	description			= name;
	TEXT[0]				= "Zaklyñcie, kere pozwoli na³adowaæ";
	TEXT[1]				= "Uriziela magicznäm energiäm.";
 	TEXT[2]				= "Niy poradza go wykorzistaæ.";
};

//---------------------------------------------------------------------
//	Schlüssel zum Versunkenen Turm
//---------------------------------------------------------------------
INSTANCE ItKe_SunkenTower(C_Item)
{
	name 				=	"Kluc";

	mainflag 			=	ITEM_KAT_NONE;
	flags 				=	ITEM_MISSION;

	value 				=	3;

	visual 				=	"ItKe_Key_03.3ds";
	material 			=	MAT_METAL;

	description			=	name;
	TEXT[0]				=	"Ôtwiero dŸwiyrze we";
	TEXT[1]				=	"zatopiäny wie¿y.";
};

//---------------------------------------------------------------------
//	Kerkerschlüssel
//---------------------------------------------------------------------
INSTANCE DungeonKey(C_Item)
{
	name 				=	"Kluc do heresztu";

	mainflag 				=	ITEM_KAT_NONE;
	flags 				=	ITEM_MISSION;

	value 				=	3;

	visual 				=	"ItKe_Key_03.3ds";
	material 				=	MAT_METAL;

	description			= name;
	TEXT[0]				= "Ôtwiero dŸwiyrze we hereszcie";
	TEXT[0]				= "Starygo Lagru.";
};


//---------------------------------------------------------------------
//	Destroyer Rune (geladen)
//---------------------------------------------------------------------
INSTANCE UrizielRune (C_Item)
{
	name 				=	"Fala œmierci Uriziela";

	mainflag 			=	ITEM_KAT_RUNE;
	flags 				=	ITEM_MISSION;

	value 				=	10000;

	visual				=	"ItAr_Rune_14.3ds";
	material			=	MAT_STONE;

	spell				= 	SPL_MASSDEATH;
	mag_circle 			=	6;

	description			=	name;
	TEXT	[0]			=	"Ta dupno runa magiczno zawiero";
	TEXT	[1]			=	"staro¿ytno potynga miecza Uriziela.";
	TEXT	[2]			=	NAME_Mag_Circle;			COUNT	[2]		=	mag_circle;
	TEXT	[3]			=	NAME_Manakosten;			COUNT	[3]		=	SPL_SENDCAST_MASSDEATH;
	TEXT	[4]			=	NAME_Dam_Magic;				COUNT	[4]		=	SPL_DAMAGE_MASSDEATH;
	TEXT	[5]			=	NAME_Value;					COUNT	[5]		=	value;
};