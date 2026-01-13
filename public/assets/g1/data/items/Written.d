
/******************************************************************************************/
INSTANCE ItWr_Book_Circle_01(C_Item)
{	
	name 					=	"Pierwszy Kr¹g";
	
	mainflag 				=	ITEM_KAT_DOCS;
	flags 					=	0;

	value 					=	50;

	visual 					=	"ItWr_Book_02_03.3ds";
	material 				=	MAT_LEATHER;

	scemeName				=	"MAP";	
	description			= "Pierwszy Kr¹g Magii";
	
	TEXT[5]				= NAME_Value;
	COUNT[5]			= value;
	on_state[0]			=	UseItWr_Book_Circle_01;
};

	FUNC VOID UseItWr_Book_Circle_01()
	{   
		var int nDocID;
		
		nDocID = 	Doc_Create		()			  ;								
					Doc_SetPages	( nDocID,  2 ); // Ile stron tworzysz                         

					Doc_SetPage 	( nDocID,  0, "Book_Mage_L.tga", 	0 		); // Grafika lewej strony
					Doc_SetPage 	( nDocID,  1, "Book_Mage_R.tga",	0		); // Grafika prawej strony
					
					//1.Seite
  					
					// Doc_PrintLine - wypisuje jedn¹ linijkê tekstu - nie wa¿ne ile znaków ma, bêdzie to jedna linijka bez zawijania.
					// Doc_PrintLines - wypisuje tekst z zawijaniem, wiêc jeœli linijka jest za d³uga to zostanie podzielona na kilka linijek.
					// We wszystkich metodach Doc_X pierwszy parametr to ID dokumentu, drugi to numer strony (0 - lewa, 1 - prawa).
					// Wa¿ne, ¿eby ustawiæ marginesy przed wypisywaniem tekstu, bo inaczej tekst mo¿e wyjœæ poza obszar strony.
					// Doc_Show musi byæ wywo³ane na koñcu wypisywania tekstu, bo mo¿e coœ siê zdupcyæ jak spróbujesz coœ zmieniæ po wywo³aniu tej funkcji.

  					Doc_SetFont 	( nDocID, -1, "font_15_book.tga"	   			); 	// Ustawiasz font (10 normalny, 15 wiêkszy), -1 = wszystkie strony
  					Doc_SetMargins	( nDocID,  0,  265, 20, 30, 20, 1   		);  	// Ustawiasz marginesy, 0 = indeks strony. (0 lewa, 1 prawa). Marginesy w pikselach (odleg³oœci od krawêdzi TGAs: lewa, góra, prawa, dó³)
					Doc_PrintLine	( nDocID,  0, "Posz³a Karolinka"			); 
					Doc_PrintLine	( nDocID,  0, "do Gogolina..."			);
					Doc_PrintLine	( nDocID,  0, "---------------");
					Doc_SetFont 	( nDocID, -1, "font_10_book.TGA"	   			);
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLines	( nDocID,  0, "Nie goñ mnie Karliczku, czego po mnie chcesz?");
					Doc_PrintLines	( nDocID,  0, "Jam ci ju¿ pedzia³a, nie byda ciê chcia³a,");
					Doc_PrintLines	( nDocID,  0, "Sam to przeca wiesz");
					Doc_PrintLines	( nDocID,  0, "Jam ci ju¿ pedzia³a, nie byda ciê chcia³a,");
					Doc_PrintLines	( nDocID,  0, "Sam to przeca wiesz");
					Doc_Show		( nDocID );
					
				

					//2.Seite
					Doc_SetMargins	( nDocID, -1, 20, 20, 275, 20, 1   		);  
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLines	( nDocID,  1,  "Cytaliœcie teroski piosynka, keroœmy widzieli razym ze arcymajstrym Francosem, jakeœmy kukli do ma³y a czorny kuli, kero ¿ech nojsamprzäd pomyli³ ze bobkiem Czornego Trolla. Arcymajster pedzio³ i¿e przez to mo¿no wejrzeæ na inkszo strona wszechœwiata. A widzielimy baby, kere tañcäwa³y a œpiywa³y tako piyœniczka. Ino tylach zapamiynto³ ze tekstu. Po ôstatnich s³owach, s³yszelimy jak ftoœ rycy - ACHTUNG GOROLE ZE SOSNOWCA! I chwila potym kula pynk³a i zmatowia³a." );
					Doc_Show		( nDocID );
	};
	
/******************************************************************************************/

INSTANCE ItWr_Book_Circle_02(C_Item)
{	
	name 					=	"Baba, kero mia³a bio³e w³osy";
	
	mainflag 				=	ITEM_KAT_DOCS;
	flags 					=	0;

	value 					=	100;

	visual 					=	"ItWr_Book_02_03.3ds";
	material 				=	MAT_LEATHER;

	scemeName				=	"MAP";	
	description			= "Historyja ô babie kero sie pojawiy³a we Nordmarze";
	
	TEXT[5]				= NAME_Value;
	COUNT[5]			= value;
	on_state[0]			=	UseItWr_Book_Circle_02;
};

	FUNC VOID UseItWr_Book_Circle_02()
	{   
		var int nDocID;
		
		var string Text_1;
		Text_1 = ConcatStrings (NAME_Manakosten,IntToString (SPL_HEALING_HP_PER_MP));
		
	
		nDocID = 	Doc_Create		()			  ;								// DocManager 
					Doc_SetPages	( nDocID,  2 );                         //wieviel Pages

					Doc_SetPage 	( nDocID,  0, "Book_Mage_L.tga", 	0 		); 
					Doc_SetPage 	( nDocID,  1, "Book_Mage_R.tga",	0		);
					
					//1.Seite
  					
  					Doc_SetFont 	( nDocID, -1, "font_15_book.tga"	   			); 	// -1 -> all pages 
  					Doc_SetMargins	( nDocID,  0,  275, 20, 30, 20, 1   		);  //  0 -> margins are in pixels
					Doc_PrintLine	( nDocID,  0, "Baba, kero mia³a"			);
					Doc_PrintLine	( nDocID,  0, "bio³e w³osy"			);
					Doc_PrintLine	( nDocID,  0, "---------------"			);
					Doc_SetFont 	( nDocID, -1, "font_10_book.TGA"	   			); 	// -1 -> all pages 
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLines	( nDocID,  0, "Dziwne informacyjne przy³azom ze Nordmaru. We Klanie Wilka pojawi³a sie ponoæ trzi metry nad zoläm baba, kero mio³a bio³e w³osy.");
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLines	( nDocID,  0, "Dup³a ô zol, ale ino sie ôtrzepa³a i posz³a do druidäw. Godali, i¿e pyta³a ô jakigoœ Bio³ygo Wilka.");
					Doc_PrintLine	( nDocID,  0, "");
					
					
					//2.Seite
					Doc_SetMargins	( nDocID, -1, 30, 20, 275, 20, 1   		);  //  0 -> margins are in pixels (Position des Textes von den Ränder des TGAs aus, links,oben,rechts,unten)
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLines	( nDocID,  1, "Pedzieli ji, i¿e tukej je Klan Wilka a niy ¿odyn Bio³y Wilk i co ôna w ogäle wynokwio i¿e tak pojawio sie i spado na ziymia z niynacka." ); 
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLines	( nDocID,  1, "Baba prychny³a, pomacha³a rynkäm i znik³a.");
					Doc_PrintLines	( nDocID,  1, "Druidy goda³y i¿e gryfno frelka z nij bä³a.");
					Doc_PrintLines	( nDocID,  1, "To spiso³ nowicjusz we Klosztorze Khorinis - Pyrokar");
					Doc_PrintLines	( nDocID,  1,  Text_1);
					
					Doc_Show		( nDocID );
	};
										
/******************************************************************************************/
INSTANCE ItWr_Book_Circle_03 (C_Item)
{	
	name 					=	"Nosz welt to symulacyjo";

	mainflag 				=	ITEM_KAT_DOCS;
	flags 					=	0;

	value 					=	150;

	visual 					=	"ItWr_Book_02_03.3ds";
	material 				=	MAT_LEATHER;

	scemeName				=	"MAP";
	description			= "Dziwno tyoryja kero wymyœlili jakeœ znudzone filozofy";
	
	TEXT[5]				= NAME_Value;
	COUNT[5]			= value;
	on_state[0]			=	UseItWr_Book_Circle_03;
	
	
};
	FUNC VOID UseItWr_Book_Circle_03()
	{   
		
		var int nDocID;
		var string Text;
		Text = ConcatStrings (NAME_Manakosten,IntToString (SPL_SENDCAST_FIREBALL));
		var string Text_1;
		Text_1 = ConcatStrings (NAME_Manakosten,IntToString (SPL_SENDCAST_ICECUBE));
		var string Text_2;
		Text_2 = ConcatStrings (NAME_Manakosten,IntToString (SPL_SENDCAST_THUNDERBALL));
		nDocID = 	Doc_Create		()			  ;								// DocManager 
					Doc_SetPages	( nDocID,  2 );                         //wieviel Pages

					Doc_SetPage 	( nDocID,  0, "Book_Mage_L.tga", 	0 		); 
					Doc_SetPage 	( nDocID,  1, "Book_Mage_R.tga",	0		);
					
					//1.Seite
  					
  					Doc_SetFont 	( nDocID, -1, "font_15_book.tga"	   			); 	// -1 -> all pages 
  					Doc_SetMargins	( nDocID,  0,  275, 20, 30, 20, 1   		);  //  0 -> margins are in pixels
					Doc_PrintLine	( nDocID,  0, "Nosz welt to symulacyjo"			);
					Doc_PrintLine	( nDocID,  0, "---------------");
					Doc_SetFont 	( nDocID, -1, "font_10_book.TGA"	   			); 	// -1 -> all pages 
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLines	( nDocID,  0, "Mäj ucony kamrat, kery wräciy³ ze wymiany we Myrtanie ôsprowio³ ô dziwny teoryje, kero zdoby³a fest popularnoœæ na kontynyncie.");
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLines	( nDocID,  0, "Jak godajäm tamtyjsi ucyni, ani jo, kery to pisze, ani ty, co to cytos - niy istniejymy! Ko¿do czänstka tego œwiata to je ino udowane. Nawet te czänstki nazwali - welt sk³odo sie ponoæ ze pikseläw.");


					//2.Seite
					Doc_SetMargins	( nDocID, -1, 30, 20, 275, 20, 1   		);  //  0 -> margins are in pixels (Position des Textes von den Ränder des TGAs aus, links,oben,rechts,unten)
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLines	( nDocID,  1, "Welt ponoæ mo byæ ino historyjäm, kero powtorzo sie durch i durch ôd tego samygo pänktu. Przebiego ta symulacyjo rä¿nie, ale ino wedle wczaœni ustalonych regu³.");
					Doc_PrintLines	( nDocID,  1, "To znaczy, i¿e niy momy w³osny woli, a steruje nami jakeœ pieroñstwo.");
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLines	( nDocID,  1, "Godajäm, i¿e nosz welt bydzie trwo³ tak dugo, jak znojdzie sie jakeœ pieroñstwo, kere bydzie chcia³o nami steräwaæ. ");
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLines	( nDocID,  1, "Niy widza przysz³oœci we Myrtanie jak tam tako degryngolada umys³owo sie szerzy");
					Doc_PrintLines	( nDocID,  1, "Co za gupoty. Spisuja do potämnych.");
					Doc_Show		( nDocID );
	};
		


/******************************************************************************************/
INSTANCE ItWr_Book_Circle_04 (C_Item)
{	
	name 					=	"Gupie a ¿odne stwory - Hobity";

	mainflag 				=	ITEM_KAT_DOCS;
	flags 					=	0;

	value 					=	200;

	visual 					=	"ItWr_Book_02_03.3ds";
	material 				=	MAT_LEATHER;

	scemeName				=	"MAP";
	description			= "Ôpis jak chopy Ônara sie trefiy³y ze nowym pieroñstwem - Hobitami.";
	
	TEXT[5]				= NAME_Value;
	COUNT[5]			= value;
	on_state[0]				=	UseItWr_Book_Circle_04;
	
	
};
	FUNC VOID UseItWr_Book_Circle_04()
	{   
		var int nDocID;
		var string Text;
		Text = ConcatStrings (NAME_Manakosten,IntToString (SPL_SENDCAST_FIRESTORM));
		var string Text_1;
		Text_1 = ConcatStrings (NAME_Manakosten,IntToString (SPL_ZAPPED_DAMAGE_PER_SEC));
		var string Text_2;
		Text_2 = ConcatStrings (NAME_Manakosten,IntToString (SPL_SENDCAST_DESTROYUNDEAD));
		nDocID = 	Doc_Create		()			  ;								// DocManager 
					Doc_SetPages	( nDocID,  2 );                         //wieviel Pages

					Doc_SetPage 	( nDocID,  0, "Book_Mage_L.tga", 	0 		); 
					Doc_SetPage 	( nDocID,  1, "Book_Mage_R.tga",	0		);
					
					//1.Seite
  					
  					Doc_SetFont 	( nDocID, -1, "font_15_book.tga"	   			); 	// -1 -> all pages 
  					Doc_SetMargins	( nDocID,  0,  275, 20, 30, 20, 1   		);  //  0 -> margins are in pixels
					Doc_PrintLines	( nDocID,  0, "Gupie a ¿adne stwory - Hobity"			);
					Doc_SetFont 	( nDocID, -1, "font_10_book.TGA"	   			); 	// -1 -> all pages 
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLines	( nDocID,  0, "Wysoko Komisyjo Gadzin i Kwiotkäw, kero przyby³a ze Myrtany wysucha³a ôpowiyœci chopäw ôd Ônara, kerzy godali, i¿e we lasach za farmäm widzieli i godali nawet ze nowym pieroñstwem, kere samo siebie nazywo Hobitami.");
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLines	( nDocID,  0, "Zeznowali i¿e Hobity säm fest ma³e, jak Beboki, a jejich szwaje majäm fest du¿o w³osäw, choby je zdyjmli ze swoich dekli. Godali tysz, i¿e Hobity pedzio³y im, i¿e idäm jak ich pradziod co sie mianäwo³ Bilenbag abo Bilbot Bagosz (niy zapamiyntali dobrze) do Samotny Gäry.");
					

					//2.Seite
					Doc_SetMargins	( nDocID, -1, 30, 20, 275, 20, 1   		);  //  0 -> margins are in pixels (Position des Textes von den Ränder des TGAs aus, links,oben,rechts,unten)
					
					
					Doc_PrintLines	( nDocID,  1, "Przeca na Khorinis niy znojdzie sie ¿odny gäry, kero tak sie nazywo. Hobity pedzia³y na to i¿e chyba sie straciy³y ale muszäm iœæ tam i nazot. I posz³y dali.");
					Doc_PrintLines	( nDocID,  1, "Chopy te, kere takie bery godali, ôkaza³o sie ponoæ i¿e dostowali jakeœ pieroñstwo ze barzo³äw Grubiorski Prze³ynczy i ôd tego ôgupieli.");
					Doc_PrintLines	( nDocID,  1, "Przewodniczäncy komisyje - arcymajster Gregorius Kulik pedzio³, i¿e pod karäm œmiyrci ¿odyn niy mo¿e godaæ takich gupot, bo sie babäm a chopäm jesce we gowach pomiyszo. I ¿e trza chyciæ tych, kerzy haszcze ze barzo³äw przynoszäm do prawych obywateläw Khorinis.");
					Doc_PrintLine	( nDocID,  1, "");	
					Doc_PrintLines	( nDocID,  1, "Fest nastraszyli tych chopäw, chyba ¿odnymu jus nic niy bydom godaæ ô tych Hobitach.");	
					
					Doc_Show		( nDocID );
	};

/******************************************************************************************/
INSTANCE  ItWr_Book_Circle_05(C_Item)
{	
	name 					=	"Azkaban";

	mainflag 				=	ITEM_KAT_DOCS;
	flags 					=	0;

	value 					=	250;

	visual 					=	"ItWr_Book_02_03.3ds";
	material 				=	MAT_LEATHER;

	scemeName				=	"MAP";
	description				= "Kaœ za morzym je tako kraina, kero mianuje sie Azkaban.";
	
	TEXT[5]				= NAME_Value;
	COUNT[5]			= value;
	on_state[0]			=	UseItWr_Book_Circle_05;
	
	
};
	FUNC VOID UseItWr_Book_Circle_05()
	{   
		var int nDocID;
		var string Text_1;
		Text_1 = ConcatStrings (NAME_Manakosten,IntToString (SPL_SENDCAST_FIRERAIN));
		var string Text_2;
		Text_2 = ConcatStrings (NAME_Manakosten,IntToString (SPL_SENDCAST_ICEWAVE));
		nDocID = 	Doc_Create		()			  ;								// DocManager 
					Doc_SetPages	( nDocID,  2 );                         //wieviel Pages

					Doc_SetPage 	( nDocID,  0, "Book_Mage_L.tga", 	0 		); 
					Doc_SetPage 	( nDocID,  1, "Book_Mage_R.tga",	0		);
					
					//1.Seite
  					
  					Doc_SetFont 	( nDocID, -1, "font_15_book.tga"	   			); 	// -1 -> all pages 
  					Doc_SetMargins	( nDocID,  0,  275, 20, 30, 20, 1   		);  //  0 -> margins are in pixels
					Doc_PrintLine	( nDocID,  0, "Kraina Azkaban"			);
					Doc_PrintLine	( nDocID,  0, "---------------");
					Doc_SetFont 	( nDocID, -1, "font_10_book.TGA"	   			); 	// -1 -> all pages 
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLines	( nDocID,  0, "Ucyni Wody ze Khorinis ôdnodli ponoæ jakeœ zapiski ô krainie Azkaban, kero le¿y furt za morzym");
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLines	( nDocID,  0, "Je tam ponoæ zomek, kery przerobiäno na hereszt. Heresztanci niy mogäm stamänd citnäñæ, bo doko³a je ino morze, a pilnujäm ich jakeœ festelne wachtyrze.");
					Doc_PrintLine	( nDocID,  0, Text_1);					
					
					
					//2.Seite
					Doc_SetMargins	( nDocID, -1, 30, 20, 275, 20, 1   		);  //  0 -> margins are in pixels (Position des Textes von den Ränder des TGAs aus, links,oben,rechts,unten)
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLines	( nDocID,  1, "A nojwa¿niyjsze je to - i¿e to je heryszt ino do uconych.");
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLines	( nDocID,  1, "Co by to niy bä³o. Samo idyjo je blank ciekawo - zrobiæ hereszt, ze kerego ¿odyn niy bydzie mäg citnäñæ.");
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLines	( nDocID,  1, "Ciekawe, czy udo³o by sie cosik takigo zrobiæ we Khorinis?");
					Doc_Show		( nDocID );
};

INSTANCE  ItWr_Book_Circle_06(C_Item)
{	
	name 					=	"Teleportacyjo we szranku";

	mainflag 				=	ITEM_KAT_DOCS;
	flags 					=	0;

	value 					=	300;

	visual 					=	"ItWr_Book_02_03.3ds";
	material 				=	MAT_LEATHER;

	scemeName				=	"MAP";
	description			= "Trakta ô szranku kery je dŸwiyrzami do inkszego œwiata.";
	
	TEXT[5]				= NAME_Value;
	COUNT[5]			= value;
	on_state[0]			=	UseItWr_Book_Circle_06;
	
	
};
	FUNC VOID UseItWr_Book_Circle_06()
	{   
		var int nDocID;
		var string Text;
		Text = ConcatStrings (NAME_Manakosten,IntToString (SPL_SENDCAST_BREATHOFDEATH));
	
		
		nDocID = 	Doc_Create		()			  ;								// DocManager 
					Doc_SetPages	( nDocID,  2 );                         //wieviel Pages

					Doc_SetPage 	( nDocID,  0, "Book_Mage_L.tga", 	0 		); 
					Doc_SetPage 	( nDocID,  1, "Book_Mage_R.tga",	0		);
					
					//1.Seite
  					
  					Doc_SetFont 	( nDocID, -1, "font_15_book.tga"	   			); 	// -1 -> all pages 
  					Doc_SetMargins	( nDocID,  0,  275, 20, 30, 20, 1   		);  //  0 -> margins are in pixels
					Doc_PrintLine	( nDocID,  0, "Teleportacyjo we szranku");
					Doc_SetFont 	( nDocID, -1, "font_10_book.TGA"	   			); 	// -1 -> all pages 
					Doc_PrintLines	( nDocID,  0, "Teroski spisza co³ko historyjo, kero sie przytrefi³a jednymu z uconych Wody we Khorinis.");
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLines	( nDocID,  0, "Pora dni tymu, przysz³a baba, kero goda³a bery ô zacarowanym szranku. A dar³a sie tak goœno, i¿e ucyni Wody niy mieli inkszygo wyjœcio ino przylyŸ i ôbocyæ, co to za dziwy sie dziejäm.");
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLine	( nDocID,  0, Text);					
					
					
					//2.Seite
					Doc_SetMargins	( nDocID, -1, 30, 20, 275, 20, 1   		);  //  0 -> margins are in pixels (Position des Textes von den Ränder des TGAs aus, links,oben,rechts,unten)
					Doc_PrintLines	( nDocID,  1, "We jeji izbie, sto³ wydowa³o sie ajnfachowy szrank. Baba rycy - a weŸcie sie te dŸwiyrze ôtwärzcie! Ôbocycie!  Toæ ucyni ôtwarli dŸwiyrze a weszli do œrodka. Jo tam sto³ z boku i widzio³ch jak ucyni znikli. ¯odyn inkszy niy mio³ ôpowogi wlyŸæ za nimi do szfranka.");
					
					Doc_PrintLines	( nDocID,  1, "WylyŸli na wiecär. Coli umorusani. Beblali coœ ô jakichœ cyntaurach, lwach co godajäm a ich kräla mianujäm Aslan. Ucyni godali cosik ô wielki haji, ô pieroñstwa ze lasu i ô tym i¿e tyn szrank trza zniszczyæ.");	
					Doc_PrintLine	( nDocID,  1, "---------------");
					Doc_PrintLines	( nDocID,  1, "Wtedy ¿ech piyrszy roz w ¿yciu wiszio³ jak ucyni Wody ciepiom fojerbolem...");
					Doc_PrintLine	( nDocID,  1, "");
				
					
					Doc_Show		( nDocID );
};

 


INSTANCE Goettergabe(C_Item)
{	
	name 					=	"Bieda w Biedaszybie";
	
	mainflag 				=	ITEM_KAT_DOCS;
	flags 					=	0;

	value 					=	100;

	visual 					=	"ItWr_Book_02_01.3ds";
	material 				=	MAT_LEATHER;

	scemeName				=	"MAP";	
	description			= "Spiso³ Stanis³aw Ligoñ";
	//TEXT[0]				= "Trzeci Kr¹g";
	////COUNT[0]			= ;
	//TEXT[1]				= "";
	////COUNT[1]			= ;
	//TEXT[2]				= "";
	//COUNT[2]			= ;
	//TEXT[3] 			= "";
	//COUNT[3]			= ;
	//TEXT[4]				= ""; 
	////COUNT[4]			= ;
	TEXT[5]				= NAME_Value;
	COUNT[5]			= value;
	on_state[0]				=	UseGoettergabe;
};

	FUNC VOID UseGoettergabe()
	{   
		var int nDocID;
		
		nDocID = 	Doc_Create		()			  ;								// DocManager 
					Doc_SetPages	( nDocID,  2 );                         //wieviel Pages

					Doc_SetPage 	( nDocID,  0, "Book_Mage_L.tga", 	0 		); 
					Doc_SetPage 	( nDocID,  1, "Book_Mage_R.tga",	0		);
					
					//1.Seite
  					
  					Doc_SetFont 	( nDocID, -1, "font_15_book.tga"	   			); 	// -1 -> all pages 
  					Doc_PrintLine	( nDocID,  0, "Bieda w Biedaszybie");
  					Doc_PrintLine	( nDocID,  0, "");
					Doc_SetMargins	( nDocID,  0,  275, 20, 30, 20, 1   		);  //  0 -> margins are in pixels
					Doc_PrintLine	( nDocID,  0, " "			);
					Doc_SetFont 	( nDocID, -1, "font_10_book.TGA"	   			); 	// -1 -> all pages 
					Doc_PrintLines	( nDocID,  0, "G³odnym! Flaki marsza graj¹... £od rana robi¹ przi dêbie, nie mio³ech k¹szczka jod³a w gêbie... to¿ dla czarów doœwiadczenio, byda ¿¹do³ do jedzynio...");
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLines	( nDocID,  0, "...Na wyraŸne me ¿¹danie i Skarbnika ³ozkazanie tam w cha³upie i sam w lesie fura jod³a duch prziniesie. Czy w zawieja, czy wœród burz, mo siê spe³niæ, no i ju¿...");
					

					//2.Seite
					Doc_SetMargins	( nDocID, -1, 30, 20, 275, 20, 1   		);  //  0 -> margins are in pixels (Position des Textes von den Ränder des TGAs aus, links,oben,rechts,unten)
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLines	( nDocID,  1, "...Widaæ... Skarbnik, co do³ rady, nie mo gowy ³od parady. Jak powiedzio³, tak siê sta³o, czy tam w doma tych maszkietów nie za ma³o siê dosta³o...");
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLines	( nDocID,  1, "...Matko Œwiêta! Wielki Bo¿e! Czy to koniec œwiata mo¿e? B³yskawice i pierony, sam i tam na wszystkie strony... Co to znacz¹ znaki te? Kaj ten las zaczarowany... same mury, wie¿e, dachy... Czych ³obudzi³ mo¿no z³e?...");	
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLines	( nDocID,  1, "Stanis³aw Ligoñ - Bery i bojki œl¹skie");
					Doc_Show		( nDocID );
	};
/******************************************************************************************/

INSTANCE Geheimnisse_der_Zauberei(C_Item)
{	
	name 					=	"Litwiny ze dwumetrowymi piszczelami";
	
	mainflag 				=	ITEM_KAT_DOCS;
	flags 					=	0;

	value 					=	100;

	visual 					=	"ItWr_Book_02_02.3ds";
	material 				=	MAT_LEATHER;

	scemeName				=	"MAP";	
	description			= "Tajymnice Kapuœciorzy";
	//TEXT[0]				= "Trzeci Kr¹g";
	////COUNT[0]			= ;
	//TEXT[1]				= "";
	////COUNT[1]			= ;
	//TEXT[2]				= "";
	//COUNT[2]			= ;
	//TEXT[3] 			= "";
	//COUNT[3]			= ;
	//TEXT[4]				= ""; 
	////COUNT[4]			= ;
	TEXT[5]				= NAME_Value;
	COUNT[5]			= value;
	on_state[0]				=	UseGeheimnisse_der_Zauberei;
};

	FUNC VOID UseGeheimnisse_der_Zauberei()
	{   
		var int nDocID;
		
		nDocID = 	Doc_Create		()			  ;								// DocManager 
					Doc_SetPages	( nDocID,  2 );                         //wieviel Pages

					Doc_SetPage 	( nDocID,  0, "Book_Mage_L.tga"  , 0 		); 
					Doc_SetPage 	( nDocID,  1, "Book_Mage_R.tga" , 0		);
					
					//1.Seite
  					
  					Doc_SetFont 	( nDocID, -1, "font_10_book.tga"); 	// -1 -> all pages 
					Doc_SetMargins	( nDocID,  0,  275, 20, 30, 20, 1);  //  0 -> margins are in pixels
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLine	( nDocID,  0, "Litwiny ze dwumetrowymi piszczelami");
					
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLines	( nDocID,  0, "Fest downo tymu, za cha³päm jakeœ rojbry znod³y dwumetrowe piszczele. Skänd ône sie tam wziy³y. ¯odyn niy wiy. Ino trza wom wiedzieæ, i¿e to niy bä³o kaœ na ôgrädku za cha³päm, ino za p³otym, za kerym by³a fest skarpa w dä³.");
					
					//2.Seite
					Doc_SetMargins	( nDocID, -1, 30, 20, 275, 20, 1);  //  0 -> margins are in pixels (Position des Textes von den Ränder des TGAs aus, links,oben,rechts,unten)
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLines	( nDocID,  1, "Bajtle jak to ôbocy³y, to mysla³y ale, i¿e tam je jakeœ fest store cmyntarzysko Litwinäw. Czymu akuratnie Litwinäw? ¯odyn tego niy wiy. Tak jus ale ôsta³o. Zapytejcie ftärego kogo to säm koœci. Ko¿dy ci powiy, i¿e Litwinäw.");
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLines	( nDocID,  1, "Spiso³ - ucony Gieen.");
					Doc_Show		( nDocID );
	};

/******************************************************************************************/
INSTANCE Machtvolle_Kunst (C_Item)
{	
	name 					=	"Cehauz";

	mainflag 				=	ITEM_KAT_DOCS;
	flags 					=	0;

	value 					=	100;

	visual 					=	"ItWr_Book_02_03.3ds";
	material 				=	MAT_LEATHER;

	scemeName				=	"MAP";
	description			= "Historyjo raubiyrzy ze Cehauzu";
	//TEXT[0]				= "Trzeci Kr¹g";
	////COUNT[0]			= ;
	//TEXT[1]				= "";
	////COUNT[1]			= ;
	//TEXT[2]				= "";
	//COUNT[2]			= ;
	//TEXT[3] 			= "";
	//COUNT[3]			= ;
	//TEXT[4]				= ""; 
	////COUNT[4]			= ;
	TEXT[5]				= NAME_Value;
	COUNT[5]			= value;
	on_state[0]				=	UseMachtvolle_Kunst;
	
	
};
	FUNC VOID UseMachtvolle_Kunst()
	{   
		var int nDocID;
		
		nDocID = 	Doc_Create		()			  ;								// DocManager 
					Doc_SetPages	( nDocID,  2 );                         //wieviel Pages

					Doc_SetPage 	( nDocID,  0, "Book_Mage_L.tga" 	, 0 		); 
					Doc_SetPage 	( nDocID,  1, "Book_Mage_R.tga"	, 0		);
					
					//1.Seite
  					
  					Doc_SetFont 	( nDocID, -1, "font_15_book.tga"); 	// -1 -> all pages 
					Doc_SetMargins	( nDocID,  0,  275, 20, 30, 20, 1);  //  0 -> margins are in pixels
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLine	( nDocID,  0, "Cehauz");
					Doc_PrintLine	( nDocID,  0, "");
					Doc_SetFont 	( nDocID, -1, "font_10_book.tga");
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLines	( nDocID,  0, "Ksiynga do tych, kerzy chcieli by trocha posuchaæ o dziki bandzie raubiyrzy ze Cehauzu.");
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLines	( nDocID,  0, "Co³kie ¿ycie spyndzi³ ¿ech na raubiyrstwie, a i teroski, jak jus staroœæ do mie przylaz³a, to ino ô tym byda myœlo³. Cehauz, to kupa lot tymu bä³ festung raubiyrzy, schowany we lesie. Pe³no tam bä³o jakigoœ dzikigo pieroñstwa, kerymu niy straszno bä³o nic.");
					
					
					//2.Seite
					Doc_SetMargins	( nDocID, -1, 30, 20, 275, 20, 1);  //  0 -> margins are in pixels (Position des Textes von den Ränder des TGAs aus, links,oben,rechts,unten)
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLines	( nDocID,  1, "Raubiyrze ze Cehauzu niy mia³y ino placu do spanio a œmiano sie, ino panäwa³o tam festelne prawo i pieroñskie ôbyczaje. Do legynd przesz³a s³awetno sztuczka, na kero sie goda³o - Lot Haszcza - ôd raubiyrza na kery sie mianäwo³ Haszczu. Lot polygo³ na tym ale, i¿e tyn pieron jednäm rynkäm sie na lina ciepo³, a we locie drugom ³apom robiy³... A zresztäm... Co jo wom byda godaæ. I tak niy spokopicie.");
					Doc_Show		( nDocID );
	};

/******************************************************************************************/
INSTANCE Elementare_Arcanei (C_Item)
{	
	name 					=	"Hypis abo chachor";

	mainflag 				=	ITEM_KAT_DOCS;
	flags 					=	0;

	value 					=	100;

	visual 					=	"ItWr_Book_02_04.3ds";
	material 				=	MAT_LEATHER;

	scemeName				=	"MAP";
	description			= "Historyjo prawdziwo";
	//TEXT[0]				= "Czwarty Kr¹g";
	////COUNT[0]			= ;
	//TEXT[1]				= "";
	////COUNT[1]			= ;
	//TEXT[2]				= "";
	//COUNT[2]			= ;
	//TEXT[3] 			= "";
	//COUNT[3]			= ;
	//TEXT[4]				= ""; 
	////COUNT[4]			= ;
	TEXT[5]				= NAME_Value;
	COUNT[5]			= value;
	on_state[0]				=	UseElementare_Arcanei;
	
	
};
	FUNC VOID UseElementare_Arcanei()
	{   
		var int nDocID;
		
		nDocID = 	Doc_Create		()			  ;								// DocManager 
					Doc_SetPages	( nDocID,  2 );                         //wieviel Pages

					Doc_SetPage 	( nDocID,  0, "Book_Mage_L.tga" ,	0 		); 
					Doc_SetPage 	( nDocID,  1, "Book_Mage_R.tga" ,	0		);
					
					//1.Seite
  					
  					Doc_SetFont 	( nDocID, -1, "font_15_book.tga"); 	// -1 -> all pages 
					Doc_SetMargins	( nDocID,  0,  275, 20, 30, 20, 1);  //  0 -> margins are in pixels
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLine	( nDocID,  0, "Hypis abo chachor");
					Doc_PrintLine	( nDocID,  0, "");
					Doc_SetFont 	( nDocID, -1, "font_10_book.tga");
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLines	( nDocID,  0, "Historyjo prawdziwo.");
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLines	( nDocID,  0, "Wiela chopäw bery goda³o ô ¿ywocie Hypisa, chachorym tys zwanego. ¯ywiy³ sie ino gorzo³om. Durœ przesiadywo³ kole sklypu ze biyrem we ³apie a zaczepio³ inkszych coby mu jakeœ szpotloki dali na halba. Niy mio³ jedny giry, a ³azi³ durœ ze kulami.");
					
					
					//2.Seite
					Doc_SetMargins	( nDocID, -1, 30, 20, 275, 20, 1);  //  0 -> margins are in pixels (Position des Textes von den Ränder des TGAs aus, links,oben,rechts,unten)
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLines	( nDocID,  1, "I to wszysko prowda. Ale to co sie wczaœni œ nim dzia³o, ma³o fto wiy. Hypis bä³ raubiyrz. £azi³ po bele kaj i szuko³ z³ämu. A¿e we jedyn dziyñ, ³azi³ som po staryj cha³pie kaœ furt daleko i wyciängo³ ze nij jakeœ stare graty. I nagle coœ sie porobiy³o i co³ki gruz zlecio³ na Hypisa. Przyczas³o mu noga, a ôn, coby sie uratäwaæ, chyci³ ceg³a i sie tak dugo klupo³ do girze a¿e jäm przeciä³ i tak doczo³go³ sie do ulicy. Tam go uratäwali.");
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLines	( nDocID,  1, "A ftoœ by se pomyœlo³, ¿e to ino taki ajnfachowy chachor");
					Doc_PrintLine	( nDocID,  1, "");
					Doc_Show		( nDocID );
	};

/******************************************************************************************/
INSTANCE  Wahre_Macht(C_Item)
{	
	name 					=	"Dramat ô bigosie";

	mainflag 				=	ITEM_KAT_DOCS;
	flags 					=	0;

	value 					=	100;

	visual 					=	"ItWr_Book_02_05.3ds";
	material 				=	MAT_LEATHER;

	scemeName				=	"MAP";
	description			= "Sztuka wysoko, napisano przez ¿ycie";
	//TEXT[0]				= "Pi¹ty Kr¹g";
	////COUNT[0]			= ;
	//TEXT[1]				= "";
	////COUNT[1]			= ;
	//TEXT[2]				= "";
	//COUNT[2]			= ;
	//TEXT[3] 			= "";
	//COUNT[3]			= ;
	//TEXT[4]				= ""; 
	////COUNT[4]			= ;
	TEXT[5]				= NAME_Value;
	COUNT[5]			= value;
	on_state[0]				=	UseWahre_Macht;
	
	
};
	FUNC VOID UseWahre_Macht()
	{   
		var int nDocID;
		
		nDocID = 	Doc_Create		()			  ;								// DocManager 
					Doc_SetPages	( nDocID,  2 );                         //wieviel Pages

					Doc_SetPage 	( nDocID,  0, "Book_Mage_L.tga"  , 0 		); 
					Doc_SetPage 	( nDocID,  1, "Book_Mage_R.tga" , 0		);
					
					//1.Seite
  					
  					Doc_SetFont 	( nDocID, -1, "font_15_book.tga"); 	// -1 -> all pages 
					Doc_SetMargins	( nDocID,  0,  275, 20, 30, 20, 1);  //  0 -> margins are in pixels
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLine	( nDocID,  0, "Dramat ô bigosie");
					Doc_PrintLine	( nDocID,  0, "");
					Doc_SetFont 	( nDocID, -1, "font_10_book.tga");
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLines	( nDocID,  0, "- Chopa takigo szukom");
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLines	( nDocID,  0, "- O tera widza! Czekej no!");
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLines	( nDocID,  0, "- Szukom takigo rudego chopa, nie? Bo ôn podobno ten... bigos gowom mieszo gdzieœ tu. Znocie takigo?");
					
					
					//2.Seite
					Doc_SetMargins	( nDocID, -1, 30, 20, 275, 20, 1);  //  0 -> margins are in pixels (Position des Textes von den Ränder des TGAs aus, links,oben,rechts,unten)
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLines	( nDocID,  1, "- Co robi?");	
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLines	( nDocID,  1, "- Bigos gowom mieszo");
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLines	( nDocID,  1, "- A to jest masorz?");
					Doc_PrintLines	( nDocID,  1, "");
					Doc_PrintLines	( nDocID,  1, "- Yyy! Piotrka, Piotruœ!");
					Doc_PrintLine	( nDocID,  1, "");	
					Doc_PrintLines	( nDocID,  1, "- Ja ôn u gäry mo¿e...");
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLines	( nDocID,  1, "- Suchej no, pojedziesz ko³o poczty i tam bedzie w stu procentach.");
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLines	( nDocID,  1, "- Dobra dziêki!");
					Doc_Show		( nDocID );
};


/******************************************************************************************/

INSTANCE  Das_magische_Erz(C_Item)
{	
	name 					=	"Magiczny wängiel";

	mainflag 				=	ITEM_KAT_DOCS;
	flags 					=	0;

	value 					=	100;

	visual 					=	"ItWr_Book_02_02.3ds";
	material 				=	MAT_LEATHER;

	scemeName				=	"MAP";
	description			= "Magiczny wängiel";
	//TEXT[0]				= "";
	////COUNT[0]			= ;
	//TEXT[1]				= "";
	////COUNT[1]			= ;
	//TEXT[2]				= "";
	//COUNT[2]			= ;
	//TEXT[3] 			= "";
	//COUNT[3]			= ;
	//TEXT[4]				= ""; 
	////COUNT[4]			= ;
	TEXT[5]				= NAME_Value;
	COUNT[5]			= value;
	on_state[0]				=	UseDas_magische_Erz;
	
	
};
	FUNC VOID UseDas_magische_Erz()
	{   
		var int nDocID;
		
		nDocID = 	Doc_Create		()			  ;								// DocManager 
					Doc_SetPages	( nDocID,  2 );                         //wieviel Pages

					Doc_SetPage 	( nDocID,  0, "Book_Brown_L.tga"  , 0 		); 
					Doc_SetPage 	( nDocID,  1, "Book_Brown_R.tga" , 0		);
					
					//1.Seite
  					
  					Doc_SetFont 	( nDocID, -1, "font_15_book.tga"); 	// -1 -> all pages 
					Doc_SetMargins	( nDocID,  0,  275, 20, 30, 20, 1);  //  0 -> margins are in pixels
					Doc_PrintLine	( nDocID,  0, "Magiczny wängiel");
					Doc_PrintLine	( nDocID,  0, "");
					Doc_SetFont 	( nDocID, -1, "font_10_book.tga");
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLines	( nDocID,  0, "Nojwiynksze ôdkrycie ludzkoœci - magiczny wängiel. Sto lot tymu znodli go we Grubiorski Przy³ynczy uczyni, kerzy lotali za lygyndäm ô downym bästwie Skarbku. Kolor tego wängla je niybieski a ôgrzano nim stal wykazowuje interesantne w³aœciwoœci. Do sie niym poliæ we piecu, jak ajnfachowym wänglem, ponoæ polepszo to samopoczucie ale na to chyba ani kräla niy stoæ. Mo¿no ty¿ ze niego zrobiæ nojpotyn¿niyjszy ôryn¿ przy kerym ajnfachowo stal je choby chuchro");
					
					
					//2.Seite
					Doc_SetMargins	( nDocID, -1, 30, 20, 275, 20, 1);  //  0 -> margins are in pixels (Position des Textes von den Ränder des TGAs aus, links,oben,rechts,unten)
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLine	( nDocID,  1, "Broñ wykuto przi pomocy magicznygo wänglo przebije ko¿dy pancyrz i ko¿do tarcza. Za tako broñ ale trza p³aciæ po krälewsku. Nawet nieftoro arystokracyjo niy staæ ani na sztylet ôgrzony magicznym wänglem. To niy je ale proste, wytargoæ tyn wängel ze przodka. Ruda fest trudno ôddzieliæ ôd ska³, tak choby ze co³kich siy³ walczy³a, coby pozostaæ pod ziymiäm.");	
					Doc_PrintLines	( nDocID,  1, "");
					Doc_Show		( nDocID );
	};

/******************************************************************************************/




/******************************************************************************************/
INSTANCE Schlacht_um_Varant1(C_Item)
{	
	name 					=	"Bebonia";

	mainflag 				=	ITEM_KAT_DOCS;
	flags 					=	0;

	value 					=	100;

	visual 					=	"ItWr_Book_02_04.3ds";
	material 				=	MAT_LEATHER;

	scemeName				=	"MAP";
	description			= "Ôstatnie pañstwo bebokäw.";
	TEXT[0]				= "Tom 1";
	////COUNT[0]			= ;
	//TEXT[1]				= "";
	////COUNT[1]			= ;
	//TEXT[2]				= "";
	//COUNT[2]			= ;
	//TEXT[3] 			= "";
	//COUNT[3]			= ;
	//TEXT[4]				= ""; 
	////COUNT[4]			= ;
	TEXT[5]				= NAME_Value;
	COUNT[5]			= value;
	on_state[0]				=	UseSchlacht_um_Varant1;
};

	FUNC VOID UseSchlacht_um_Varant1()
	{   
		var int nDocID;
		
		nDocID = 	Doc_Create		()			  ;								// DocManager 
					Doc_SetPages	( nDocID,  2 );                         //wieviel Pages

					Doc_SetPage 	( nDocID,  0, "Book_Red_L.tga",		0 		); 
					Doc_SetPage 	( nDocID,  1, "Book_Red_R.tga",		0		);
					
					//1.Seite
 
					Doc_SetMargins	( nDocID,  0,  275, 20, 30, 20, 1   		);  //  0 -> margins are in pixels
					Doc_SetFont 	( nDocID, -1, "font_10_book.tga"	   			); 	// -1 -> all pages 
					Doc_PrintLine	( nDocID,  0, ""					); 					
					Doc_PrintLines	( nDocID,  0, "Moc ludzi widzi we bebokach ino ¿adne stworzynia, kere ¿yjäm bez sk³adu i ³adu. Ma³owiela ze ludzi wiy, i¿e moc czasu tymu, beboki mio³y swoje w³asne pañstwo. Bebonia, po³o¿ono na po³edniowy zachäd od Myrtany. Niy mo¿no pedzieæ i¿e ta bä³ ordnung, beboki ale mio³y swojego w³adce - Pigola III. Bä³ to bebok, kerego nawet czorne beboki da¿y³y szacunkiem. Spotko³ sie ôn ale ze siy³äm, kero jus za jego fatra szterowa³a jego pañstwo. ");
					
					//2.Seite

					Doc_SetMargins	( nDocID, -1, 30, 20, 275, 20, 1   		);  //  0 -> margins are in pixels (Position des Textes von den Ränder des TGAs aus, links,oben,rechts,unten)
					Doc_PrintLine	( nDocID,  1, ""					);					
					Doc_PrintLines	( nDocID,  1, "Bä³y to ôrki. A dok³adnie klan USROCK kerymu przewodzi³ DONROCK TRUMPOD, ô niyspotykany pomarañczowy skärze. Ryco³ na wszyskich i godo³ durch WRAHT TOU RIBKH DARAH, co mo¿no by przekludziæ jako: Ôrki zaœ muszäm byæ dupne!");
					Doc_PrintLine	( nDocID,  1, ""					);
					Doc_PrintLines	( nDocID,  1, "DONROCK za wszelko cyna chcio³ sie zapisaæ we historyji swoigo klanu jako tyn, kery rozszerzy jego granice. A jego wzrok pod³ na Bebonia w³aœnie. Wiedzio³ ale i¿e bebokäw je moc, a bez to zaczä³ truæ rzeki ze kerych korzysta³y beboki, coby wpyndziæ je we epidemijo a g³äd. Bestos, po d³ugi chorobie umar Pigol II, po tym jak zjod oiyñæ kilo psträngäw ze zatruty rzeki.");
					
					Doc_Show		( nDocID );
	};
	
/******************************************************************************************/
INSTANCE Schlacht_um_Varant2(C_Item)
{	
	name 					=	"Bitwa o Varrant";

	mainflag 				=	ITEM_KAT_DOCS;
	flags 					=	0;

	value 					=	100;

	visual 					=	"ItWr_Book_02_05.3ds";
	material 				=	MAT_LEATHER;

	scemeName				=	"MAP";
	description			= "Bitwa o Varrant";
	TEXT[0]				= "Tom 2";
	////COUNT[0]			= ;
	//TEXT[1]				= "";
	////COUNT[1]			= ;
	//TEXT[2]				= "";
	//COUNT[2]			= ;
	//TEXT[3] 			= "";
	//COUNT[3]			= ;
	//TEXT[4]				= ""; 
	////COUNT[4]			= ;
	TEXT[5]				= NAME_Value;
	COUNT[5]			= value;
	on_state[0]				=	UseSchlacht_um_Varant2;
};

	FUNC VOID UseSchlacht_um_Varant2()
	{   
		var int nDocID;
		
		nDocID = 	Doc_Create		()			  ;								// DocManager 
					Doc_SetPages	( nDocID,  2 );                         //wieviel Pages

					Doc_SetPage 	( nDocID,  0, "Book_Red_L.tga",		0 		); 
					Doc_SetPage 	( nDocID,  1, "Book_Red_R.tga", 	0		);
					
					//1.Seite
 
					Doc_SetMargins	( nDocID,  0,  275, 20, 30, 20, 1   		);  //  0 -> margins are in pixels
					Doc_SetFont 	( nDocID, -1, "font_10_book.tga"	   			); 	// -1 -> all pages 
					Doc_PrintLine	( nDocID,  0, ""					); 					
					Doc_PrintLines	( nDocID,  0, "Wojna by³a skoñczona. Varant straci³o swe morskie porty, tak potrzebne dla zaopatrywania armii. Król Rhobar nie traci³ wiêcej czasu na polu bitwy, lecz zostawi³ swych genera³ów, by ci rozprawili siê z niedobitkami nieprzyjaciela. Varrantczycy posiadali ju¿ tylko jedno ognisko oporu, zgromadzone wokó³ Lukkora, najpotê¿niejszego genera³a ca³ego narodu, który umiejêtnie zamieni³ pora¿kê w zwyciêstwo.");
					
					//2.Seite

					Doc_SetMargins	( nDocID, -1, 30, 20, 275, 20, 1   		);  //  0 -> margins are in pixels (Position des Textes von den Ränder des TGAs aus, links,oben,rechts,unten)
					Doc_PrintLine	( nDocID,  1, ""					);					
					Doc_PrintLines	( nDocID,  1, "Ale teraz jego armia znalaz³a siê w potrzasku. Sytuacja zda³a siê byæ beznadziejna, choæ jego wojska przewy¿sza³y si³y królewskie liczb¹ i wyposa¿eniem. Oto jeden z Myrtañskich bohaterów, mê¿ny genera³ imieniem Lee, zwabi³ przeciwnika w pu³apkê. Na podmok³ej, bagnistej ziemi ciê¿ka kawaleria Lukkora nie mia³a szans w starciu ze zwinnymi ¿o³nierzami Lee. Zdziesi¹tkowane oddzia³y Varantu wkrótce musia³y uznaæ wy¿szoœæ przeciwnika. Lukkor zosta³ pokonany.");
					
					Doc_Show		( nDocID );
	};
	
/******************************************************************************************/
INSTANCE Myrtanas_Lyrik(C_Item)
{	
	name 					=	"Dioblisko";

	mainflag 				=	ITEM_KAT_DOCS;
	flags 					=	0;

	value 					=	100;

	visual 					=	"ItWr_Book_02_02.3ds";
	material 				=	MAT_LEATHER;

	scemeName				=	"MAP";
	description			= "Poezyjo Myrtañsko";

	TEXT[5]				= NAME_Value;
	COUNT[5]			= value;
	on_state[0]				=	UseMyrtanas_Lyrik;
};

	FUNC VOID UseMyrtanas_Lyrik()
	{   
		var int nDocID;
		
		nDocID = 	Doc_Create		()			  ;								// DocManager 
					Doc_SetPages	( nDocID,  2 );                         //wieviel Pages

					Doc_SetPage 	( nDocID,  0, "Book_Red_L.tga" , 	0 		); 
					Doc_SetPage 	( nDocID,  1, "Book_Red_R.tga" , 	0		);
					
					//1.Seite
 
					Doc_SetMargins	( nDocID,  0,  275, 20, 30, 20, 1   		);  //  0 -> margins are in pixels
					Doc_SetFont 	( nDocID, -1, "font_10_book.tga"	   			); 	// -1 -> all pages 
					Doc_PrintLine	( nDocID,  0, ""					); 					
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLine	( nDocID,  0, "    Dioblisko");
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLines	( nDocID,  1, "Dej mi pokój, dej pokój, ³ostow mie, dioble.");				
					Doc_PrintLine	( nDocID,  1, "");				
					Doc_PrintLines	( nDocID,  1, "Bo ty ¿eœ diobo³, choæ bio³y. Jo nie poradza ju¿");				
					Doc_PrintLine	( nDocID,  1, "");				
					Doc_PrintLines	( nDocID,  1, "dychaæ, ju¿ mie bieróm, ju¿ mie rozrywajóm");				
					Doc_PrintLine	( nDocID,  1, "");				
					Doc_PrintLines	( nDocID,  1, "na drobne, na skrowki, we piersiach mie poli");				
					Doc_PrintLine	( nDocID,  1, "");				
					Doc_PrintLines	( nDocID,  1, "¿arym, jynzyk sie robi napuch³y i strzimaæ ju¿ nie");				
					Doc_PrintLine	( nDocID,  1, "");				
					Doc_PrintLines	( nDocID,  1, "moga bólu, kiery ¿eœ mi prziniós, jak¿eœ mie ciepno³");				
					Doc_PrintLine	( nDocID,  1, "");				
					Doc_PrintLines	( nDocID,  1, "bez tyn króng z ³ognia. Widza ich ma³e twarziczki,");				
					Doc_PrintLine	( nDocID,  1, "");				
					Doc_PrintLines	( nDocID,  1, "patrzóm na mie choby zza jakiej bio³yj gardiny,");	
					Doc_PrintLine	( nDocID,  0, "");
		
					//2.Seite

					Doc_SetMargins	( nDocID, -1, 30, 20, 275, 20, 1   		);  //  0 -> margins are in pixels (Position des Textes von den Ränder des TGAs aus, links,oben,rechts,unten)
					Doc_PrintLine	( nDocID,  1, ""					);					
					Doc_PrintLines	( nDocID,  1, "a to zza zos³ony dymu patrzóm, bo to jo sie pola,");				
					Doc_PrintLine	( nDocID,  1, "");				
					Doc_PrintLines	( nDocID,  1, "jo skwiercza jak wieprzek na ³ogniu. I widza, jak siê");				
					Doc_PrintLine	( nDocID,  1, "");				
					Doc_PrintLines	( nDocID,  1, "k³adóm jedyn ³obok drugigo, za rynce sie chytajóm");				
					Doc_PrintLine	( nDocID,  1, "");				
					Doc_PrintLines	( nDocID,  1, "i cicho p³acz¹, coœ szeptajóm, ino jo ich ju¿ niy moga");				
					Doc_PrintLine	( nDocID,  1, "");				
					Doc_PrintLines	( nDocID,  1, "us³yszeæ, bo mój w³asny ryk zag³uszo wszystko.");				
					Doc_PrintLine	( nDocID,  1, "");				
					Doc_PrintLines	( nDocID,  1, "Nie poradza ju¿ nic, zamykóm ³oczy i skacza w dó³,");				
					Doc_PrintLine	( nDocID,  1, "");				
					Doc_PrintLines	( nDocID,  1, "w tyn piekielny jynk i czorno przepaœæ bez dna.");				
					Doc_PrintLine	( nDocID,  1, "");				
					Doc_PrintLines	( nDocID,  1, "Anna Dziewit-Meller");				
					Doc_PrintLines	( nDocID,  1, ""	);
					Doc_Show		( nDocID );
	};
/******************************************************************************************/
INSTANCE Lehren_der_Goetter1 (C_ITEM)
{	
	name 					=	"M¹droœæ Bogów, tom 1";

	mainflag 				=	ITEM_KAT_DOCS;
	flags 					=	0;

	value 					=	100;

	visual 					=	"ItWr_Book_02_01.3ds";
	material 				=	MAT_LEATHER;

	scemeName				=	"MAP";
	description			= "M¹droœæ Bogów";
	TEXT[0]				= "Tom 1";
	TEXT[5]				= NAME_Value;
	COUNT[5]			= value;
	on_state[0]				=	UseLehren_der_Goetter1;
};

	FUNC VOID UseLehren_der_Goetter1()
	{   
		var int nDocID;
		
		nDocID = 	Doc_Create		()			  ;								// DocManager 
					Doc_SetPages	( nDocID,  2 );                         //wieviel Pages

					Doc_SetPage 	( nDocID,  0, "Book_Red_L.tga" , 	0 		); 
					Doc_SetPage 	( nDocID,  1, "Book_Red_R.tga" , 	0		);
					
					//1.Seite

 					Doc_SetMargins	( nDocID,  0,  275, 20, 30, 20, 1   		);  //  0 -> margins are in pixels 					
					Doc_SetFont 	( nDocID, -1, "font_10_book.tga"	   			); 	// -1 -> all pages 
 					Doc_PrintLine	( nDocID,  0, ""					);										
					Doc_PrintLines	( nDocID,  0, "Wys³uchajcie s³ów bo¿ych, bo pragn¹ oni, byœcie ich wys³uchali. Przestrzegajcie praw bo¿ych, bo chc¹ oni, byœcie ich przestrzegali. Czcijcie kap³anów bo¿ych, bo oni s¹ wybrañcami ³aski..."	);
					Doc_PrintLine	( nDocID,  0, ""					);
					//Absatz
					Doc_PrintLines	( nDocID,  0, "S³owa Innosa: A gdybyœcie nie mogli ich poj¹æ, nie odrzucajcie s³ów kap³anów, bo g³osz¹ oni moj¹ m¹droœæ. Gdy¿ ja jestem S³oñcem na niebie, œwiat³em i ¿yciem na Ziemi. A wszystko, co wrogiem jest S³oñca, jest i moim wrogiem, i zostanie wygnane do krainy wiecznej ciemnoœci.");

					//2.Seite
					Doc_SetMargins	( nDocID, -1, 30, 20, 275, 20, 1   		);  //  0 -> margins are in pixels (Position des Textes von den Ränder des TGAs aus, links,oben,rechts,unten)
					Doc_PrintLine	( nDocID,  1, ""					);
					Doc_PrintLines	( nDocID,  1, "S³owa Adanosa: ¯yjcie i pracujcie, bo dzieñ stworzono po to, by m¹¿ móg³ ¿yæ i pracowaæ. Szukajcie wiedzy, byœcie mogli przekazaæ j¹ synom swoim, gdy¿ taka jest wola moja. Ale strze¿cie siê, bo cz³ek g³upi i leniwy zostanie wygnany do krainy wiecznej ciemnoœci."	);
					Doc_PrintLine	( nDocID,  1, ""					);
					//Absatz
					Doc_PrintLines	( nDocID,  1, "S³owa Beliara: A ktokolwiek wyst¹pi przeciw woli bo¿ej, ze mn¹ bêdzie mia³ do czynienia. Na jego cia³o ból zeœlê okrutny, a jego duch pójdzie ze mn¹ do krainy wiecznej ciemnoœci."					);
					Doc_Show		( nDocID );
	};

/******************************************************************************************/
INSTANCE Lehren_der_Goetter2 (C_ITEM)
{	
	name 					=	"M¹droœæ Bogów, tom 2";

	mainflag 				=	ITEM_KAT_DOCS;
	flags 					=	0;

	value 					=	100;

	visual 					=	"ItWr_Book_02_02.3ds";
	material 				=	MAT_LEATHER;

	scemeName				=	"MAP";
	description			= "M¹droœæ Bogów";
	TEXT[0]				= "Tom 2";
	TEXT[5]				= NAME_Value;
	COUNT[5]			= value;
	on_state[0]				=	UseLehren_der_Goetter2;
};

	FUNC VOID UseLehren_der_Goetter2()
	{   
		var int nDocID;
		
		nDocID = 	Doc_Create		()			  ;								// DocManager 
					Doc_SetPages	( nDocID,  2 );                         //wieviel Pages

					Doc_SetPage 	( nDocID,  0, "Book_Red_L.tga" , 	0 		); 
					Doc_SetPage 	( nDocID,  1, "Book_Red_R.tga" , 	0		);
					
					//1.Seite
 
					Doc_SetMargins	( nDocID,  0,  275, 20, 30, 20, 1   		);  //  0 -> margins are in pixels
					Doc_SetFont 	( nDocID, -1, "font_10_book.tga"	   			); 	// -1 -> all pages 
					Doc_PrintLine	( nDocID,  0, ""					); 					
					Doc_PrintLines	( nDocID,  0, "O zaraniu dziejów: Na pocz¹tku nie by³o dnia ani nocy, i ¿adne ¿ywe stworzenie nie przemierza³o œwiata. Wtedy pojawi³ siê Innos, a jego blask pada³ na Ziemiê. Innos obdarzy³ œwiat darem ¿ycia. Ale ¿adne stworzenie nie œmia³o spojrzeæ w twarz Innosa, wiêc dobry bóg stworzy³ S³oñce. Lecz mimo to, jasnoœæ by³a zbyt wielka, tote¿ Innos podzieli³ siê na dwoje i tak powsta³ Beliar. Beliar stworzy³ noc. Teraz cz³owiek móg³ wreszcie ¿yæ, lecz nie wiedzia³ jak. Dlatego Innos podzieli³ siê po raz wtóry i tak powsta³ Adanos. Adanos przyniós³ ludziom pomys³owoœæ i m¹droœæ, której tak bardzo potrzebowali.");
					
					//2.Seite

					Doc_SetMargins	( nDocID, -1, 30, 20, 275, 20, 1   		);  //  0 -> margins are in pixels (Position des Textes von den Ränder des TGAs aus, links,oben,rechts,unten)
					Doc_PrintLine	( nDocID,  1, ""					);					
					Doc_PrintLines	( nDocID,  1, "Dlatego Innos postanowi³ zostawiæ ludzkoœæ pod opiek¹ Adanosa i uda³ siê na spoczynek. Lecz Beliar p³on¹³ z zazdroœci, gdy¿ ludzie bali siê go i nie oddawali mu czci. Tedy postanowi³ Beliar stworzyæ cz³owieka, który modli³by siê tylko do niego. Ale cz³owiek ów by³ jako wszyscy inni, i ba³ siê Beliara i nie oddawa³ mu czci. Bóg nocy rozz³oœci³ siê i zabi³ cz³owieka krzycz¹c: Dobrze! Bójcie siê mnie zatem, ale czeœæ oddacie mi, choæby po œmierci. Tymi s³owy ustanowi³ Beliar Œmieræ - kres ¿ywota ludzkiego."	);
					Doc_Show		( nDocID );
	};

/******************************************************************************************/
INSTANCE Lehren_der_Goetter3 (C_ITEM)
{	
	name 					=	"M¹droœæ Bogów, tom 3";

	mainflag 				=	ITEM_KAT_DOCS;
	flags 					=	0;

	value 					=	100;

	visual 					=	"ItWr_Book_02_03.3ds";
	material 				=	MAT_LEATHER;

	scemeName				=	"MAP";
	description			= "M¹droœæ Bogów";
	TEXT[0]				= "Tom 3";

	TEXT[5]				= NAME_Value;
	COUNT[5]			= value;
	on_state[0]				=	UseLehren_der_Goetter3;
};

	FUNC VOID UseLehren_der_Goetter3()
	{   
		var int nDocID;
		
		nDocID = 	Doc_Create		()			  ;								// DocManager 
					Doc_SetPages	( nDocID,  2 );                         //wieviel Pages

					Doc_SetPage 	( nDocID,  0, "Book_Red_L.tga" , 	0 		); 
					Doc_SetPage 	( nDocID,  1, "Book_Red_R.tga" , 	0		);
					
					//1.Seite

					Doc_SetMargins	( nDocID,  0,  275, 20, 30, 20, 1   		);  //  0 -> margins are in pixels
   					Doc_SetFont 	( nDocID, -1, "font_10_book.tga"	   			); 	// -1 -> all pages 
   					Doc_PrintLine	( nDocID,  0, ""					);			
					Doc_PrintLines	( nDocID,  0, "Innos pozwoli³, by ludzie mogli go us³yszeæ i przemawiaæ do niego. Pozwoli³ im równie¿ czyniæ cuda i nazwa³ je magi¹. Dziêki magii, ludzie zaczêli zmieniaæ œwiat wedle swego upodobania, jedni m¹drze, inni g³upio. Widz¹c to, Innos zabra³ dar magii ludziom g³upim i pozostawi³ go w rêkach ludzi œwiat³ych. Obdarzy³ ich równie¿ innymi ³askami, czyni¹c swoimi kap³anami i nadaj¹c im miano magów."	);
					
					//2.Seite
					Doc_SetMargins	( nDocID, -1, 30, 20, 275, 20, 1   		);  //  0 -> margins are in pixels (Position des Textes von den Ränder des TGAs aus, links,oben,rechts,unten)
 					Doc_PrintLine	( nDocID,  1, ""					);					
					Doc_PrintLines	( nDocID,  1, "Ludzie czcili kap³anów Innosa i oddawali im czeœæ, ale wielu magów odwróci³o siê od Innosa i uciek³o siê pod opiekê jego boskiego brata - Adanosa. Kasta magów uleg³a rozbiciu. Ci, którzy pod¹¿ali za bogiem m¹droœci nazwali siebie magami Krêgu Wody. Wyznawcy Innosa nazywani zaœ byli Magami Ognia."	);
					Doc_Show		( nDocID );
	};
/******************************************************************************************/
INSTANCE Jagd_und_Beute (C_ITEM)
{	
	name 					=	"£owy i zwierzyna";
	mainflag 				=	ITEM_KAT_DOCS;			
									
	flags 					=	0;

	value 					=	100;

	visual 					=	"ItWr_Book_02_02.3ds";
	material 				=	MAT_LEATHER;

	scemeName				=	"MAP";
	description			= "£owy i zwierzyna";
	//TEXT[0]				= "";
	////COUNT[0]			= ;
	//TEXT[1]				= "";
	////COUNT[1]			= ;
	//TEXT[2]				= "";
	//COUNT[2]			= ;
	//TEXT[3] 			= "";
	//COUNT[3]			= ;
	//TEXT[4]				= ""; 
	////COUNT[4]			= ;
	TEXT[5]				= NAME_Value;
	COUNT[5]			= value;
	on_state[0]				=	UseJagd_und_Beute;
};

	FUNC VOID UseJagd_und_Beute()
	{   
		var int nDocID;
		
		nDocID = 	Doc_Create		()			  ;								// DocManager 
					Doc_SetPages	( nDocID,  2 );                         //wieviel Pages

					Doc_SetPage 	( nDocID,  0, "Book_Brown_L.tga" , 	0 		); 
					Doc_SetPage 	( nDocID,  1, "Book_Brown_R.tga" , 	0		);
					
					//1.Seite
 
					Doc_SetMargins	( nDocID,  0,  275, 20, 30, 20, 1   		);  //  0 -> margins are in pixels
					Doc_SetFont 	( nDocID, -1, "font_10_book.tga"	   			); 	// -1 -> all pages 
					Doc_PrintLine	( nDocID,  0, ""					); 					
					Doc_PrintLines	( nDocID,  0, "Jego zapiski przetrwa³y ca³e wieki i po dziœ dzieñ uznawane s¹ za najznakomitsze kompendium wiedzy o polowaniu. Po d³ugich latach staræ na pó³nocnym pograniczu, niemal ka¿dy obywatel potrafi pos³ugiwaæ siê ³ukiem. Jednak sztuka polowania daleko wykracza poza podstawowe zasady strzelania z ³uku! Zwierzyna jest wszak p³ocha i nieprzewidywalna!");
					
					//2.Seite

					Doc_SetMargins	( nDocID, -1, 30, 20, 275, 20, 1   		);  //  0 -> margins are in pixels (Position des Textes von den Ränder des TGAs aus, links,oben,rechts,unten)
					Doc_PrintLine	( nDocID,  1, ""					);					
					Doc_PrintLines	( nDocID,  1, "Polowanie z ³ukiem ma swe pocz¹tki w czasach staro¿ytnych. W ci¹gu ca³ych tysi¹cleci nie zasz³y w technikach ³owieckich wiêksze zmiany i tak ju¿ najprawdopodobniej pozostanie. Jakie czynniki wp³ywaj¹ tak naprawdê na skutecznoœæ pos³ugiwania siê ³ukiem? To w³aœnie rozpoznanie tych czynników czyni prawdziwego mistrza ³ucznictwa."	);
					Doc_Show		( nDocID );
	};
/******************************************************************************************/
INSTANCE Kampfkunst (C_ITEM)
{	
	name 					=	"Sztuka walki";

	mainflag 				=	ITEM_KAT_DOCS;
	flags 					=	0;

	value 					=	100;

	visual 					=	"ItWr_Book_02_03.3ds";
	material 				=	MAT_LEATHER;

	scemeName				=	"MAP";
	description			= "Sztuka walki";
	//TEXT[0]				= "";                                                                                                                                                                                          
	////COUNT[0]			= ;
	//TEXT[1]				= "";
	////COUNT[1]			= ;
	//TEXT[2]				= "";
	//COUNT[2]			= ;
	//TEXT[3] 			= "";
	//COUNT[3]			= ;
	//TEXT[4]				= ""; 
	////COUNT[4]			= ;
	TEXT[5]				= NAME_Value;
	COUNT[5]			= value;
	on_state[0]				=	UseKampfkunst;
};

	FUNC VOID UseKampfkunst()
	{   
		var int nDocID;
		
		nDocID = 	Doc_Create		()			  ;								// DocManager 
					Doc_SetPages	( nDocID,  2 );                         //wieviel Pages

					Doc_SetPage 	( nDocID,  0, "Book_Brown_L.tga" , 	0 		); 
					Doc_SetPage 	( nDocID,  1, "Book_Brown_R.tga" , 	0		);
					
					//1.Seite

					Doc_SetMargins	( nDocID,  0,  275, 20, 30, 20, 1   		);  //  0 -> margins are in pixels
   					Doc_SetFont 	( nDocID, -1, "font_10_book.tga"	   			); 	// -1 -> all pages 
  					Doc_PrintLine	( nDocID,  0, ""					);					
  					Doc_PrintLine	( nDocID,  0, ""					);					
  					Doc_PrintLine	( nDocID,  0, ""					);					
					Doc_PrintLines	( nDocID,  0, "Od 2000 lat nauki mistrzów kszta³tuj¹ rozwój sztuki walki."	);
  					Doc_PrintLine	( nDocID,  0, ""					);					
  					Doc_PrintLine	( nDocID,  0, ""					);					
   					Doc_PrintLines	( nDocID,  0, "Zrêcznoœæ, opanowanie, szybkoœæ, zdolnoœæ obserwacji i b³yskawicznego podejmowania decyzji - wszystkie te umiejêtnoœci nale¿y bezustannie doskonaliæ. Jedynie doskona³a koordynacja ruchów i zachowanie w³aœciwej postawy pozwol¹ na prawid³owy rozwój twych umiejêtnoœci."	);			
					
					//2.Seite
					Doc_SetMargins	( nDocID, -1, 30, 20, 275, 20, 1   		);  //  0 -> margins are in pixels (Position des Textes von den Ränder des TGAs aus, links,oben,rechts,unten)
  					Doc_PrintLine	( nDocID,  1, ""					);					
  					Doc_PrintLine	( nDocID,  1, ""					);					
  					Doc_PrintLine	( nDocID,  1, ""					);					
					Doc_PrintLines	( nDocID,  1, "Przes³anie duchowych i cielesnych nauk Mistrza przetrwa³o wiele lat."	);
  					Doc_PrintLine	( nDocID,  1, ""					);					
  					Doc_PrintLine	( nDocID,  1, ""					);					
 					Doc_PrintLines	( nDocID,  1, "Jego niepospolity sukces by³ natchnieniem dla kolejnych pokoleñ. Œwiat zmienia³ siê bez przerwy, ale idealna harmonia si³ duchowych i sprawnoœci cia³a pozosta³a niezmienn¹."					);					
					Doc_Show		( nDocID );
	};

/******************************************************************************************/
INSTANCE Die_Gruft (C_ITEM)
{	
	name 				=	"Krypta";

	mainflag 			=	ITEM_KAT_DOCS;
	flags 				=	0;

	value 				=	100;

	visual 				=	"ItWr_Book_02_03.3ds";
	material 			=	MAT_LEATHER;

	scemeName			=	"MAP";
	description			= "Krypta";
	TEXT[5]				= NAME_Value;
	COUNT[5]			= value;
};




/******************************************************************************************/
INSTANCE Astronomie (C_ITEM)
{	
	name 					=	"Astronomia";

	mainflag 				=	ITEM_KAT_DOCS;
	flags 					=	0;

	value 					=	100;

	visual 					=	"ItWr_Book_02_05.3ds";
	material 				=	MAT_LEATHER;

	scemeName				=	"MAP";
	description			= "Astronomia";
	//TEXT[0]				= "";
	////COUNT[0]			= ;
	//TEXT[1]				= "";
	////COUNT[1]			= ;
	//TEXT[2]				= "";
	//COUNT[2]			= ;
	//TEXT[3] 			= "";
	//COUNT[3]			= ;
	//TEXT[4]				= ""; 
	////COUNT[4]			= ;
	TEXT[5]				= NAME_Value;
	COUNT[5]			= value;
	on_state[0]				=	UseAstronomie;
};

	FUNC VOID UseAstronomie()
	{   
		var int nDocID;
		
		nDocID = 	Doc_Create		()			  ;								// DocManager 
					Doc_SetPages	( nDocID,  2 );                         //wieviel Pages

					Doc_SetPage 	( nDocID,  0, "Book_Brown_L.tga"  , 0 		); 
					Doc_SetPage 	( nDocID,  1, "Book_Brown_R.tga" , 0		);
					
					//1.Seite

 					Doc_SetMargins	( nDocID,  0,  275, 20, 30, 20, 1   		);  //  0 -> margins are in pixels 					
					Doc_SetFont 	( nDocID, -1, "font_10_book.tga"	   			); 	// -1 -> all pages 
 					Doc_PrintLine	( nDocID,  0, ""					);										
					Doc_PrintLines	( nDocID,  0, "W centrum wszechœwiata znajduje siê Morgrad, co zawiera cztery ¿ywio³y - ziemiê, wodê, ogieñ i wiatr. Morgrad, co jest wiecznie niespokojnym sercem Beliara. A nad nim rozci¹ga siê sfera niebios."	);
					Doc_PrintLine	( nDocID,  0, ""					);
					//Absatz
					Doc_PrintLines	( nDocID,  0, "W odwiecznej hierarchii kosmosu cz³owiek stoi poœrodku. Jego dusza pozwala mu doœwiadczaæ ³ask niebiañskich, ale jego cia³o stworzone jest z substancji Morgradu. Jest wiêc cz³owiek odzwierciedleniem ca³ego œwiata.");

					//2.Seite
					Doc_SetMargins	( nDocID, -1, 30, 20, 275, 20, 1   		);  //  0 -> margins are in pixels (Position des Textes von den Ränder des TGAs aus, links,oben,rechts,unten)
					Doc_PrintLine	( nDocID,  1, ""					);
					Doc_PrintLines	( nDocID,  1, "Orbity wszystkich planet, czyli drogi, jakie pokonuj¹ okr¹¿aj¹c Morgrad, zmieniaj¹ siê nieznacznie z up³ywem lat. Pewnym jest zatem, i¿ ca³y wszechœwiat zmierza powoli do jakiegoœ celu."	);
					Doc_PrintLine	( nDocID,  1, ""					);
					//Absatz
					Doc_PrintLines	( nDocID,  1, "Obserwuj¹c ruch ksiê¿yca na nocnym niebie ustaliliœmy d³ugoœæ roku i stworzyliœmy pierwszy kalendarz.");
					Doc_Show		( nDocID );
	};
/******************************************************************************************/

/******************************************************************************************/
INSTANCE Rezepturen (C_ITEM)
{	
	name 					=	"Przepisy";

	mainflag 				=	ITEM_KAT_DOCS;
	flags 					=	0;

	value 					=	100;

	visual 					=	"ItWr_Book_02_04.3ds";
	material 				=	MAT_LEATHER;

	scemeName				=	"MAP";
	description			= "Przepisy";
	TEXT[0]				= "Tom 1";
	////COUNT[0]			= ;
	//TEXT[1]				= "";
	////COUNT[1]			= ;
	//TEXT[2]				= "";
	//COUNT[2]			= ;
	//TEXT[3] 			= "";
	//COUNT[3]			= ;
	//TEXT[4]				= ""; 
	////COUNT[4]			= ;
	TEXT[5]				= NAME_Value;
	COUNT[5]			= value;
	on_state[0]				=	UseRezepturen;
};

	FUNC VOID UseRezepturen()
	{   
		var int nDocID;
		
		nDocID = 	Doc_Create		()			  ;								// DocManager 
					Doc_SetPages	( nDocID,  2 );                         //wieviel Pages

					Doc_SetPage 	( nDocID,  0, "Book_Brown_L.tga"  , 0 		); 
					Doc_SetPage 	( nDocID,  1, "Book_Brown_R.tga" , 0		);
					
					//1.Seite

 					Doc_SetMargins	( nDocID,  0,  275, 20, 30, 20, 1   		);  //  0 -> margins are in pixels 					
					Doc_SetFont 	( nDocID, -1, "font_10_book.tga"	   			); 	// -1 -> all pages 
 					Doc_PrintLine	( nDocID,  0, ""					);										
					Doc_PrintLines	( nDocID,  0, "Balsam widzenia:"	);
					Doc_PrintLine	( nDocID,  0, "----------------"					);
					Doc_PrintLine	( nDocID,  0, ""					);		
					Doc_PrintLines	( nDocID,  0, "Polejcie oczy pacjenta ¿r¹c¹ ¿ó³ci¹. ¯ó³æ zada mu ból okrutny, przez który ca³kiem zm¹drzeje i nauczy siê widzieæ to czego wczeœniej nie widzia³ i cieszyæ z tego, co mia³ do tej pory!");

					//2.Seite
					Doc_SetMargins	( nDocID, -1, 30, 20, 275, 20, 1   		);  //  0 -> margins are in pixels (Position des Textes von den Ränder des TGAs aus, links,oben,rechts,unten)
					Doc_PrintLine	( nDocID,  1, ""					);
					Doc_PrintLines	( nDocID,  1, ""	);
					Doc_PrintLine	( nDocID,  1, ""					);
					//Absatz
					Doc_PrintLines	( nDocID,  1, "¯ó³æ i wiedza nie id¹ w parze i s¹ jako ogieñ i woda. Dlatego mêdrzec potrafi nad ¿ó³ci¹ panowaæ, by nie prowadzi³a go do awanturnictwa i inszych ekscesów. Tylko ten, co w pe³ni doceni boski dar ¿ycia, w pe³ni to ¿ycie wykorzysta.");
					Doc_Show		( nDocID );
	};
/******************************************************************************************/
INSTANCE Rezepturen2 (C_ITEM)
{	
	name 					=	"Przepisy";

	mainflag 				=	ITEM_KAT_DOCS;
	flags 					=	0;

	value 					=	100;

	visual 					=	"ItWr_Book_02_04.3ds";
	material 				=	MAT_LEATHER;

	scemeName				=	"MAP";
	description			= "Przepisy";
	TEXT[0]				= "Tom 2";
	////COUNT[0]			= ;
	//TEXT[1]				= "";
	////COUNT[1]			= ;
	//TEXT[2]				= "";
	//COUNT[2]			= ;
	//TEXT[3] 			= "";
	//COUNT[3]			= ;
	//TEXT[4]				= ""; 
	////COUNT[4]			= ;
	TEXT[5]				= NAME_Value;
	COUNT[5]			= value;
	on_state[0]				=	UseRezepturen2;
};

	FUNC VOID UseRezepturen2()
	{   
		var int nDocID;
		
		nDocID = 	Doc_Create		()			  ;								// DocManager 
					Doc_SetPages	( nDocID,  2 );                         //wieviel Pages

					Doc_SetPage 	( nDocID,  0, "Book_Brown_L.tga"  , 0 		); 
					Doc_SetPage 	( nDocID,  1, "Book_Brown_R.tga" , 0		);
					
					//1.Seite

 					Doc_SetMargins	( nDocID,  0,  275, 20, 30, 20, 1   		);  //  0 -> margins are in pixels 					
					Doc_SetFont 	( nDocID, -1, "font_10_book.tga"	   			); 	// -1 -> all pages 
 					Doc_PrintLine	( nDocID,  0, ""					);										
					Doc_PrintLines	( nDocID,  0, "Wino zapomnienia"	);
					Doc_PrintLine	( nDocID,  0, "--------------------"					);
						Doc_PrintLine	( nDocID,  0, ""					);			
					Doc_PrintLines	( nDocID,  0, "Najzacniejsze winogrona najdziecie na wysokich zboczach Archolos. Sztuka dojrzewania winnych kiœci le¿y w niezak³ócaniu ich spokoju. Teraz dodaæ jeno w³aœciwych zió³ i czekaæ na efekty.");

					//2.Seite
					Doc_SetMargins	( nDocID, -1, 30, 20, 275, 20, 1   		);  //  0 -> margins are in pixels (Position des Textes von den Ränder des TGAs aus, links,oben,rechts,unten)
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLines	( nDocID,  1, "");
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLine	( nDocID,  1, "");
					//Absatz
					Doc_PrintLines	( nDocID,  1, "Tak oto prawdziwy mistrz zamienia wodê ze studni w zacne wino. Ludzie raduj¹ siê, chwal¹ jego dzie³o. A mistrz dalej dzia³a w zgodzie z Natur¹, czerpi¹c z tego, co ona mu hojn¹ rêk¹ udziela.");
					Doc_Show		( nDocID );
	};
/******************************************************************************************/


INSTANCE TagebuchOT (C_Item)
{	
	name 					=	"Dziennik";

	mainflag 					=	ITEM_KAT_DOCS;
	flags 					=	0;

	value 					=	100;

	visual 					=	"ItWr_Book_02_01.3ds";
	material 					=	MAT_LEATHER;

	scemeName				=	"MAP";
	description			= "Dziennik";
	TEXT[0]				= "Stara, zniszczona ksiêga.";
	////COUNT[0]			= ;
	TEXT[1]				= "Brakuje kilku kartek.";
	////COUNT[1]			= ;
	//TEXT[2]				= "";
	//COUNT[2]			= ;
	//TEXT[3] 			= "";
	//COUNT[3]			= ;
	//TEXT[4]				= ""; 
	////COUNT[4]			= ;
	//TEXT[5]				= NAME_Value;
	//COUNT[5]			= value;
	on_state[0]				=	UseTagebuchOT;
	
	
};
	FUNC VOID UseTagebuchOT()
	{   
		var int nDocID;
		
		nDocID = 	Doc_Create		()			  ;				// DocManager 
					Doc_SetPages		( nDocID,  2 );                         //wieviel Pages

					Doc_SetPage 	( nDocID,  0, "Book_Brown_L.tga" ,	0 		); 
					Doc_SetPage 	( nDocID,  1, "Book_Brown_R.tga" ,	0		);
					
					//1.Seite	
  					Doc_SetFont 		( nDocID, -1, "font_15_book.tga"); 	// -1 -> all pages 
					Doc_SetMargins	( nDocID,  0,  275, 20, 30, 20, 1);  //  0 -> margins are in pixels
					Doc_PrintLine		( nDocID,  0, "23. Tag");
					Doc_SetFont 		( nDocID, -1, "font_10_book.tga");
					Doc_PrintLines	( nDocID,  0, "Zatraci³em ju¿ poczucie czasu.");
					Doc_PrintLines	( nDocID,  0, "Zdaje siê, ¿e minê³y co najmniej 23 dni od chwili, gdy zostaliœmy schwytani przez orków i zmuszeni do pracy.");
					Doc_PrintLines	( nDocID,  0, "Te pod³e istoty nie znaj¹ litoœci! S³absi z nas po prostu padaj¹ na ziemiê i ju¿ siê nie podnosz¹!");
					Doc_PrintLines	( nDocID,  0, "Ucieknê st¹d, niewa¿ne jak!");
					Doc_PrintLine		( nDocID,  0, "");
					Doc_SetFont 		( nDocID, -1, "font_15_book.tga"); 	// -1 -> all pages 
					Doc_SetMargins	( nDocID,  0,  275, 20, 30, 20, 1);  //  0 -> margins are in pixels
					Doc_PrintLine		( nDocID,  0, "28. Tag");
					Doc_SetFont 		( nDocID, -1, "font_10_book.tga");
					Doc_PrintLines	( nDocID,  0, "Kazali nam kopaæ jeszcze dalej, w g³¹b góry.");
					Doc_PrintLines	( nDocID,  0, "Przednia czêœæ jest ju¿ gigantyczna. Ciekawe, czemu to wszystko ma s³u¿yæ?");

					//1.Seite	
  					Doc_SetFont 		( nDocID, -1, "font_15_book.tga"); 	// -1 -> all pages 
					Doc_SetMargins	( nDocID, -1, 30, 20, 275, 20, 1); //  0 -> margins are in pixels
					Doc_PrintLine		( nDocID,  1, "Dzieñ 67");
					Doc_SetFont 		( nDocID, -1, "font_10_book.tga");
					Doc_PrintLines	( nDocID,  1, "Podobno ci orkowi kap³ani nie maj¹ serc. Jeœli to prawda, jakim cudem nadal siê poruszaj¹?");
					Doc_PrintLines	( nDocID,  1, "Widzia³em miecz, którego tak bardzo siê boj¹. Gdyby uda³o mi siê go zdobyæ, ju¿ ja bym im pokaza³...");
					Doc_PrintLine		( nDocID,  1, "");
					Doc_SetFont 		( nDocID, -1, "font_15_book.tga"); 	// -1 -> all pages 
					Doc_SetMargins	( nDocID, -1, 30, 20, 275, 20, 1);   //  0 -> margins are in pixels
					Doc_PrintLine		( nDocID,  1, "Dzieñ 78");
					Doc_SetFont 		( nDocID, -1, "font_10_book.tga");
					Doc_PrintLines	( nDocID,  1, "Miecz spoczywa w przedniej komorze œwi¹tyni, ale bezustannie strze¿e go jeden z kap³anów.");
					Doc_PrintLines	( nDocID,  1, "Zamierzam st¹d uciec. Zostawiê tu mój pamiêtnik, mo¿e komuœ siê jeszcze przyda.");
					Doc_Show		( nDocID );
};


INSTANCE ItWr_Bloodfly_01(C_Item)
{	
	name 					=	"Krwiopijcy";
	
	mainflag 				=	ITEM_KAT_DOCS;
	flags 					=	0;

	value 					=	150;

	visual 					=	"ItWr_Book_02_01.3ds";
	material 				=	MAT_LEATHER;

	scemeName				=	"MAP";	
	description			= "Krwiopijcy";
	
	TEXT[5]				= NAME_Value;
	COUNT[5]			= value;
	on_state[0]				=	UseItWr_Bloodfly_01;
};

	FUNC VOID UseItWr_Bloodfly_01()
	{   
		var int nDocID;
		
		nDocID = 	Doc_Create		()			  ;								// DocManager 
					Doc_SetPages	( nDocID,  2 );                         //wieviel Pages

					Doc_SetPage 	( nDocID,  0, "Book_Brown_L.tga", 	0 		); 
					Doc_SetPage 	( nDocID,  1, "Book_Brown_R.tga",	0		);
					
					//1.Seite
  					
  					Doc_SetFont 	( nDocID, -1, "font_15_book.tga"	   			); 	// -1 -> all pages 
 					Doc_SetMargins	( nDocID,  0,  275, 20, 30, 20, 1   		);  //  0 -> margins are in pixels
 					Doc_PrintLine	( nDocID,  0, "Krwiopijcy");
  					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLine	( nDocID,  0, " "			);
					Doc_SetFont 	( nDocID, -1, "font_10_book.TGA"	   			); 	// -1 -> all pages 
					Doc_PrintLine	( nDocID,  0, "O krwiopijcach");
					Doc_PrintLine	( nDocID,  0, "");
					Doc_PrintLines	( nDocID,  0, "Ale w miejscu, gdzie grunt jest podmok³y a powietrze wilgotne, krwiopijcy zbieraj¹ siê stadami, zwabione zapachem potu ¿ywych istot. Swoimi ¿¹d³ami uœmiercaj¹ ofiary i ucztuj¹ na ich krwi. ");
					Doc_PrintLine	( nDocID,  0, "");
					

					//2.Seite
					Doc_SetMargins	( nDocID, -1, 30, 20, 275, 20, 1   		);  //  0 -> margins are in pixels (Position des Textes von den Ränder des TGAs aus, links,oben,rechts,unten)
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLines	( nDocID,  1, "Myœliwi z bagien nauczyli siê pozyskiwaæ ¿¹d³a tych drapie¿ców. W tym celu nacinaj¹ wnêtrznoœci krwiopijców i usuwaj¹ ostro¿nie ¿¹d³o wraz z otaczaj¹c¹ je tkank¹. Nastêpnie zeskrobuj¹ niejadalne miêso...");	
					Doc_PrintLine	( nDocID,  1, "");
					Doc_PrintLine	( nDocID,  1, "");
					Doc_Show		( nDocID );
					
					if Knows_GetBFSting ==  FALSE
					{
					Knows_GetBFSting = TRUE;
					Log_CreateTopic (GE_AnimalTrophies,LOG_NOTE);
					B_LogEntry (GE_AnimalTrophies,"Usuwanie ¿¹de³ krwiopijców");	
					PrintScreen	("Nowa umiejêtnoœæ: Usuwanie ¿¹de³ krwiopijców", -1,-1,"FONT_OLD_20_WHITE.TGA",2);
					};
	};