//#####################################################################
//##
//##
//##							KAPITEL 2
//##
//##
//#####################################################################

//---------------------------------------------------------------------
//	Karte fÃ¼r 1. Fokus
//---------------------------------------------------------------------
INSTANCE ItWrFocusmapPsi(C_Item)
{	
	name 			=	"Mapa ôd Y'Beriona";
	
	mainflag 		=	ITEM_KAT_DOCS;
	flags 			=	ITEM_MISSION;

	value 			=	15;

	visual 			=	"ItWr_Map_01.3ds";
	material 		=	MAT_LEATHER;

	scemeName		=	"MAP";	
	on_state[0]		=	UseFocusmapPsi;

	description		= name;
	TEXT[1]			= "Ta karta pokazuje kaj ôstawili berga";
	TEXT[2]			= "ôgniskujänco, kery pozwoli";
	TEXT[3]			= "Y'Berionowi wezwaæ Nynoka.";
};

	FUNC VOID UseFocusmapPsi()
	{
		var int nDocID;
		
		nDocID = 	Doc_CreateMap	()			  ;							// DocManager 
					Doc_SetLevel	( nDocID,	"WORLD.ZEN" );
					Doc_SetPages	( nDocID, 1 );                         
					Doc_SetPage 	( nDocID, 0, "Map_World_FocusPSI.tga", 	1	);  //  1 -> DO NOT SCALE 

					Doc_Show		( nDocID 	);
	};

//---------------------------------------------------------------------
//	Fokus 1 - (Meeresklippe)
//---------------------------------------------------------------------
INSTANCE Focus_1(C_Item)
{	
	name 				=	"Berga ze morskigo klifa";
	mainflag 			=	ITEM_KAT_NONE;
	flags 				=	ITEM_MISSION;	

	hp 					=	1;
	hp_max 				=	1;
	weight 				=	1;
	value 				=	1;

	visual 				=	"ItMi_Focus_01.3ds";
	material 			=	MAT_STONE;

	description			=	name;
	TEXT[1]				=	"Jedyn ze piyñciu artefaktäw kere";
	TEXT[2]				=	"u¿yli przy tworzyniu Baryjery.";
};

//---------------------------------------------------------------------
//	Zahnrad fÃ¼r Ian
//---------------------------------------------------------------------
INSTANCE ItMi_Stuff_Gearwheel_01(C_Item)
{	
	name 				=	"Ko³o zymbate";

	mainflag 			=	ITEM_KAT_NONE;
	flags 				=	ITEM_MISSION;	

	value 				=	0;

	visual 				=	"ItMi_Stuff_Gearwheel_01.3ds";
	material 			=	MAT_METAL;
	description			=	name;
	TEXT[0]				=	"Pochodzi ze uszkodzonego d¿i¿d¿acza";
	TEXT[1]				=	"kerego ôstawili we bocznym tunelu";
	TEXT[2]				=	"Stary Gruby.";
};

//---------------------------------------------------------------------
//	Minecrawler-Ei
//---------------------------------------------------------------------
INSTANCE ItAt_Crawlerqueen(C_Item)
{	
	name 					=	"Jajco pe³zoka";
	
	mainflag 				=	ITEM_KAT_NONE;
	flags 					=	ITEM_MISSION|ITEM_MULTI;	

	value 					=	100;

	visual 					=	"ItAt_Crawlerqueen.3ds"; 
	material 				=	MAT_LEATHER;

	description				=	name;
	TEXT[0]					=	"Te jajca z³o¿y³a ";
	TEXT[1]					=	"krälowa pe³zokäw.";
	TEXT[2]					=	"Cuæ i¿e je w nich fest srogo wydzielina,";
	TEXT[3]					=	"srogszo ni¿ ze bebechäw doros³ych pe³zokäw.";
	TEXT[5]					=	NAME_Value;					COUNT[5]	= value;
};

//---------------------------------------------------------------------
//	Almanach / Fokusbuch
//---------------------------------------------------------------------
INSTANCE ItWrFokusbuch(C_Item)
{	
	name 					=	"Almanach";

	mainflag 				=	ITEM_KAT_DOCS;
	flags 					=	ITEM_MISSION;	

	value 					=	0;

	visual 					=	"ItWr_Book_02_03.3ds";
	material 				=	MAT_LEATHER;

	scemeName				=	"MAP";
	on_state[0]				= 	UseItWrFokusbuch;
	description				=	name;
	TEXT[0]					=	"Tyn staro¿ytny, magiczny buch zawiero";
	TEXT[1]					=	"fragmynty ô wykorzystaniu ";
	TEXT[2]					=	"mocy berg ôgniskujäncych.";
};
	FUNC VOID UseItWrFokusbuch()
	{   
				
					if (Wissen_Almanach == FALSE)
					&& Npc_IsPlayer (self)
					{
						B_GiveXP (50);
						Wissen_Almanach = TRUE;
					};
				
					var int			nDocID;	
					nDocID = 	Doc_Create		()			  ;								// DocManager 
					Doc_SetPages	( nDocID,  2 );                         //wieviel Pages

					Doc_SetPage 	( nDocID,  0, "Book_Mage_L.tga", 	0 		); 
					Doc_SetPage 	( nDocID,  1, "Book_Mage_R.tga",	0		);
					
					//1.Seite
  					
  					Doc_SetFont 	( nDocID, -1, "font_15_book.tga"	   			); 	// -1 -> all pages 
  					Doc_SetMargins	( nDocID,  0,  275, 20, 30, 20, 1   		);  //  0 -> margins are in pixels
					Doc_PrintLine	( nDocID,  0, "Czynœæ 23"			);
					Doc_PrintLine	( nDocID,  0, "");
					Doc_SetFont 	( nDocID, -1, "font_10_book.TGA"	   			); 	// -1 -> all pages 
					Doc_PrintLine	( nDocID,  0, "Ôgniskowanie mocy");
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLines	( nDocID,  0, "Magija skumulowano we berdze ulego wielokrotnymu wzmocniyniu zanim wyzwoläm ja s³owa zaklyñcio. To, czy efekt bydzie trwo³ dugo czy niy, zale¿y ino ôd uczonygo. ");
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLines	( nDocID,  0, "Po wyzwolyniu energii, berga staje sie ino pustäm skorupäm.");

					//2.Seite
					Doc_SetMargins	( nDocID, -1, 30, 20, 275, 20, 1   		);  //  0 -> margins are in pixels (Position des Textes von den RÃ¤nder des TGAs aus, links,oben,rechts,unten)
					Doc_PrintLine	( nDocID,  1,  "");
					Doc_PrintLines	( nDocID,  1, "S³owa, kere trza pedzieæ, coby uwolniæ moc bergi, niy powinny byæ zagodkäm do wiynkszoœci adeptäw sztuk magicznych. We dzisiejszych czasach, nawet formu³y pozwalajänce tchnänæ magia we nowy artefakt spowszednia³y. ");
					Doc_PrintLine	( nDocID,  1,  "");
					Doc_PrintLines	( nDocID,  1,  "Ino niyliczni majäm ale wiedza jak zaœ na³adowaæ berga. Te prastare formu³y wymyœli³ ponoæ säm stary piyrwa, co godajäm, i¿e by³ na ziymi jesce przed Innosem, ale takie bery to säm fest strze¿one sekreta arcymajsträw magije i niy moga sam dugo ô tym ôsprawiaæ." );
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLines	( nDocID,  1, "Zatem, mäm nadzieja i¿e niy je ¿eœ mamlas i mos w swoi duszy s³owa staro¿ytny potyngi.  ");
					
					Doc_Show		( nDocID );
	};
