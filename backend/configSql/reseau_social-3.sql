-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : ven. 06 mai 2022 à 08:49
-- Version du serveur : 10.4.21-MariaDB
-- Version de PHP : 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `reseau_social`
--

-- --------------------------------------------------------

--
-- Structure de la table `comment`
--

CREATE TABLE `comment` (
  `idCOM` int(11) NOT NULL,
  `idCreateur` int(10) UNSIGNED NOT NULL,
  `idPublication` int(10) UNSIGNED NOT NULL,
  `commentPseudo` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `comment`
--

INSERT INTO `comment` (`idCOM`, `idCreateur`, `idPublication`, `commentPseudo`, `message`, `timestamp`) VALUES
(15, 3, 2, 'julesWeb435', 'bonjour test234', '2022-04-28 07:09:14'),
(29, 3, 9, 'julesWeb435', 'prout', '2022-04-28 11:53:26'),
(30, 3, 9, 'julesWeb435', 'ceci est un commentaire', '2022-04-28 11:53:30'),
(31, 3, 9, 'julesWeb435', 'ceci est un commentaire', '2022-04-28 11:53:30'),
(32, 3, 9, 'julesWeb435', 'sde', '2022-04-28 11:53:33'),
(36, 3, 6, 'julesWeb435', 'je laisse un commentaire', '2022-04-28 12:18:58'),
(37, 3, 7, 'julesWeb435', 'je laisse un commentaire', '2022-04-28 12:19:06'),
(38, 3, 2, 'julesWeb435', 'c\'est un com', '2022-04-28 12:19:13'),
(40, 3, 2, 'julesWeb435', 'un nouveau com', '2022-04-28 16:17:56'),
(44, 3, 5, 'julesWeb435', 'salut a tous', '2022-04-28 16:28:36'),
(47, 3, 4, 'julesWeb435', 'ça c\'est du pseudo ; )', '2022-04-28 16:36:10'),
(56, 3, 57, 'julesWeb435', 'ça c\'est de la photo !', '2022-04-29 08:34:25'),
(58, 5, 90, 'Global', 'trop mimi', '2022-05-02 08:21:46'),
(59, 5, 89, 'Global', 'c\'est fou', '2022-05-02 08:21:53');

-- --------------------------------------------------------

--
-- Structure de la table `post`
--

CREATE TABLE `post` (
  `idPOST` int(10) UNSIGNED NOT NULL,
  `userId` int(10) UNSIGNED NOT NULL,
  `message` text DEFAULT NULL,
  `picture` varchar(150) DEFAULT NULL,
  `likers` int(11) NOT NULL DEFAULT 0,
  `timestamp` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `post`
--

INSERT INTO `post` (`idPOST`, `userId`, `message`, `picture`, `likers`, `timestamp`) VALUES
(2, 19, 'Sympa mes dernières vacances non ? Likez partagez vite', './uploads/posts/5f85e4e67a53ec1f88d1dcce1604180959551.jpg', 0, '2022-04-03 19:26:20'),
(4, 7, 'Incroyable ce son', NULL, 0, '2022-04-03 19:26:20'),
(5, 6, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores provident iste iure illum deserunt cumque commodi nobis impedit eum, repellendus, sunt, quo quidem? Hic vel labore modi minus voluptate ad aliquam asperiores 👌👌', NULL, 0, '2022-04-03 19:26:20'),
(6, 2, 'Petite après midi jardinage oklmzer 🍒', './uploads/posts/5f9be256dff674319424bdb91604242031805.jpg', 0, '2022-04-03 19:26:20'),
(7, 18, 'Il a changé le pont d\'Aquitaine. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores provident iste iure illum deserunt cumque commodi nobis impedit eum 😂😂', './uploads/posts/5f9ecb2a8a2ec12a94a35b211604242389909.jpg', 0, '2022-04-03 19:26:20'),
(9, 16, 'Il parait que la vie ne vaut le coup d\'être vécu que si, ouai ok on s\'en fout', './uploads/posts/5f9ed64ca9df7838e47da7671604245123099.jpg', 0, '2022-04-03 19:26:20'),
(10, 10, '👨‍❤️‍👨 👩‍❤️‍👩 👪 👨‍👩‍👦 👨‍👩‍👧 👨‍👩‍👧‍👦', './uploads/posts/5f9ed6fca9df7838e47da76b1604245314103.jpg', 0, '2022-04-03 19:26:20'),
(11, 20, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, officia. Fugit illum, ipsa porro, minima nisi adipisci labore optio rerum voluptatem vel atque numquam harum alias est temporibus cumque neque obcaecati, aliquam ea corporis culpa doloribus ut! 😲😲 Suscipit vitae incidunt recusandae nihil praesentium quasi aliquid eum! Nihil ab praesentium earum odio illo illum sequi aut facilis distinctio. Delectus, aspernatur illo! 🤮', NULL, 0, '2022-04-03 19:26:20'),
(15, 4, 'Posey 🤭 sit amet consectetur adipisicing elit. Et, officia. Fugit illum, ipsa porro, minima nisi adipisci labore optio rerum voluptatem vel atque numquam harum alias est temporibus cumque neque obcaecati 🤩', './uploads/posts/5f85e4e67a53ec1f88d1dcce1604252147894.jpg', 0, '2022-04-03 19:26:20'),
(55, 3, 'Ca c\'est du post', '/Users/julescynamon/Desktop/GoupomaniaP7/frontend/public/uploads/posts/undefined', 0, '2022-04-29 10:02:20'),
(56, 3, 'Ca c\'est du post', '[object Object]', 0, '2022-04-29 10:30:00'),
(57, 3, 'Ca c\'est du post', './uploads/posts/undefined', 0, '2022-04-29 10:33:40'),
(58, 3, 'Trop beau', './uploads/posts/undefined', 0, '2022-05-01 08:41:13'),
(59, 3, 'test2', './uploads/posts/31651389282770.jpg', 0, '2022-05-01 09:14:42'),
(60, 3, 'test', './uploads/posts/31651389904205.jpg', 0, '2022-05-01 09:25:04'),
(61, 3, 'test', NULL, 0, '2022-05-01 09:27:21'),
(62, 3, 'Salut tout le monde', NULL, 0, '2022-05-01 09:27:38'),
(64, 3, 'salut a tous', NULL, 0, '2022-05-01 10:25:59'),
(65, 18, 'c\'est top', NULL, 0, '2022-05-02 09:17:40'),
(66, 18, 'c\'est top', './uploads/posts/181651475860008.jpg', 0, '2022-05-02 09:17:40'),
(68, 18, 'c\'est top', './uploads/posts/181651475909308.jpg', 0, '2022-05-02 09:18:29'),
(70, 18, 'qu\'en pensez vous ?', './uploads/posts/181651476189519.jpg', 0, '2022-05-02 09:23:09'),
(72, 18, 'c\'est beau ?', './uploads/posts/181651476608491.jpg', 0, '2022-05-02 09:30:08'),
(74, 18, 'c\'est beau', './uploads/posts/181651477105936.jpg', 0, '2022-05-02 09:38:25'),
(77, 18, 'salut tout le monde', NULL, 0, '2022-05-02 09:50:30'),
(80, 18, 'test', NULL, 0, '2022-05-02 10:03:06'),
(81, 3, 'test', NULL, 0, '2022-05-02 10:09:07'),
(82, 3, 'test', NULL, 0, '2022-05-02 10:10:05'),
(83, 3, 'bonjour', NULL, 0, '2022-05-02 10:11:27'),
(84, 3, 'c\'est fou', NULL, 0, '2022-05-02 10:11:50'),
(85, 3, 'c\'est fou', './uploads/posts/31651479110714.jpg', 0, '2022-05-02 10:11:50'),
(86, 3, 'test', NULL, 0, '2022-05-02 10:16:32'),
(87, 3, 'test', './uploads/posts/31651479396639.jpg', 0, '2022-05-02 10:16:36'),
(89, 3, 'c\'est incroyable', './uploads/posts/31651479454867.jpg', 0, '2022-05-02 10:17:34'),
(90, 5, 'salut a tous', './uploads/posts/51651479697698.jpg', 0, '2022-05-02 10:21:37'),
(91, 5, '', './uploads/posts/51651479751715.jpg', 0, '2022-05-02 10:22:31'),
(92, 5, 'quoi de neuf bro ?', NULL, 0, '2022-05-02 11:52:24'),
(93, 3, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, iure? Deleniti id facilis corporis atque aliquid perferendis rem, laboriosam dolorem quos nam? Deserunt odio inventore error accusamus voluptas voluptatem ullam neque dolores, reprehenderit, quaerat eligendi aliquam doloremque libero expedita alias, vel iusto. Earum odio illum temporibus, repudiandae obcaecati aliquam dolorem fugit officia suscipit similique dolores fuga eligendi unde velit. Eligendi?', NULL, 0, '2022-05-02 12:07:04'),
(94, 3, 'belle photo non ? ', './uploads/posts/31651486053189.jpg', 0, '2022-05-02 12:07:33'),
(95, 3, 'on est bien aujourd\'hui ?', NULL, 0, '2022-05-04 20:27:27'),
(96, 3, '', './uploads/posts/31651688858897.jpg', 0, '2022-05-04 20:27:38'),
(98, 3, 'Salut tout le monde ', './uploads/posts/31651748633042.jpg', 0, '2022-05-05 13:03:53');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `IdUSER` int(10) UNSIGNED NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `bio` text DEFAULT NULL,
  `picture` varchar(120) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`IdUSER`, `username`, `email`, `password`, `bio`, `picture`) VALUES
(1, 'titiNaima', 'naima@hotmail.com', '$2b$10$pCkP4lCU3aI.nCbKVKRVVezkBHXs2mLXOej52/50G6mo.Lljn902q', NULL, '/Users/julescynamon/Desktop/GoupomaniaP7/frontend/public/uploads/profil/titiNaima.png'),
(2, 'Francis4L', 'francis@gmail.com', '$2a$10$LT6tk6EXN4si1Jq3hzp6y.aomWYeDxIlBuhfv.zxKOmOOaUSQ/98q', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate est consequatur minus temporibus repudiandae, tenetur aliquam necessitatibus explicabo ut blanditiis nobis maxime deleniti ducimus quos molestias iure maiores voluptatem. Culpa, temporibus? Esse error architecto inventore quaerat suscipit atque amet sequi veritatis? Veniam ex dolores autem quaerat ipsa incidunt vel repellat deleniti quae quia dignissimos atque repudiandae nihil libero, velit praesentium! Harum vitae debitis magni optio nesciunt ipsam modi, sint impedit? Saepe temporibus excepturi molestiae error! Iure sapiente voluptatibus veritatis sunt cum neque ducimus aliquid!', 'uploads/profil/Francis4L.jpg'),
(3, 'julesWeb435', 'julescynamon@hotmail.com', '$2b$10$zPf9teK98dJaFe5Wq3/cf.RZA80LzC2z7hMTMw4RZ.jAe4Yq8A30K', 'je suis un developpeur en apprentissage et j\'ai hate de présenter mon app', 'uploads/profil/julesWeb435.jpg'),
(4, 'JeanNeymar', 'neymar@gmail.com', '$2a$10$rLDRRTgi5PoDYP9TFnVeqePbhOVxMd01l.cnZ3/6Kk0XxcvsO62Im', NULL, 'uploads/profil/JeanNeymar.jpg'),
(5, 'Global', 'global@gmail.com', '$2a$10$I22hxe2P.GL97LfQeSgPmOlfBpvcz3eYXPCertz31JGJJyuGqe7Ty', 'je suis nouvelle', 'uploads/profil/Global.jpg'),
(6, 'JulesKounde', 'kounde@gmail.com', '$2a$10$li15EenwKBeXPjd3J3BVEuDkVQAaFJvB/ch751LI7V43IivRkPZ6.', 'Salut à tous', 'uploads/profil/JulesKounde.jpg'),
(7, 'JeanDuvoyage', 'jeandu@gmail.com', '$2a$10$4pAORfUKrJrCFpC3KTmWzuZ86gYq0OzcJOyfAB3GqL8fDimovu.cq', NULL, 'uploads/profil/JeanDuvoyage.jpg'),
(8, 'LaurentDelacouette', 'laurent@gmail.com', '$2a$10$LOF3.qF0uGgMWEl3booQFO9wCVs2M8ZP337BY9hSuy6za0qnLRAv6', NULL, '/Users/julescynamon/Desktop/GoupomaniaP7/frontend/public/uploads/profil/LaurentDelacouette.png'),
(9, 'ZinedineTzigane', 'zidane@gmail.com', '$2a$10$nEWVSO7bGkwXT6dXkFA/6.k1rKqnynSc.pTxRVHz0ICh.iu9ajxve', NULL, 'uploads/profil/ZinedineTzigane.jpg'),
(10, 'PascalAuBistrot', 'pascal@gmail.com', '$2a$10$ZiSEsrcI/alBQapcLQ9yaeIga0kKazs8pidrkziXx3lDjUzLOo83W', NULL, 'uploads/profil/PascalAuBistrot.jpg'),
(11, 'LouisDeFitness', 'louis@gmail.com', '$2a$10$an3/If6G.YQIOY/HtUVnFOLoRQAiFsKkk4nvIQzAisINOXVSbBvjC', NULL, '/Users/julescynamon/Desktop/GoupomaniaP7/frontend/public/uploads/profil/random-user.png'),
(12, 'VanneRoumanoff', 'vanne@gmail.com', '$2a$10$Ef/Ku4RXbdrWKgtfMT8vnujCHsi7dy/1i.0xNk0l3sGlGg6gVucwO', NULL, '/Users/julescynamon/Desktop/GoupomaniaP7/frontend/public/uploads/profil/random-user.png'),
(13, 'CecileDuFlot', 'cecile@gmail.com', '$2a$10$0IwtqvjmmRrv9RqFGHXe7uzifrThbyRURYXv4VGZo2JDzVvegjf9y', NULL, 'uploads/profil/CecileDuFlot.jpg'),
(14, 'QuadMerad', 'merad@gmail.com', '$2a$10$CaBfkm6oODwJaqp7kM9fSueyJrCbIb/s5UY.gSLumgpJ6gvYJfG36', 'fefzgzev', '/Users/julescynamon/Desktop/GoupomaniaP7/frontend/public/uploads/profil/random-user.png'),
(15, 'testeur', 'test.test@gmail.com', '$2a$10$/PeiUnVADADHxdr8eicfCuVbGhbD9HhHp14PjNKCqKAEleBNaKOZ2', NULL, '/Users/julescynamon/Desktop/GoupomaniaP7/frontend/public/uploads/profil/random-user.png'),
(16, 'Philou', 'philou@gmail.com', '$2a$10$Tp0NPRIaxRP5LtdRQPHSXevf.RTB04twYh5lkR8xgfnT12UFl.w12', NULL, 'uploads/profil/Philou.jpg'),
(17, 'Sarah', 'sarah@gmail.com', '$2a$10$9VG0R/nGT/4QReyucQRaS.rWeyKl8/hb/RmcS2cRFk3rTKc3loY0q', 'Hello à tous !', '/Users/julescynamon/Desktop/GoupomaniaP7/frontend/public/uploads/profil/sarah.png'),
(18, 'Audrey', 'audrey@gmail.com', '$2a$10$rKSgZ1mdSZicuxf3kUb7A./MGRPAzVB927hnK.HUGNHIdKvlGBnKi', NULL, 'uploads/profil/Audrey.jpg'),
(19, 'Justine', 'justine@gmail.com', '$2a$10$cEzAvRecKpEKJbZ5ETe9jerU6oTI7MBv8b6UMyg9Fl/inrCAd6lHC', NULL, 'uploads/profil/Justine.jpg'),
(20, 'Cameron', 'cameron@gmail.com', '$2a$10$Al31MFVjk.X6pwZ1RvAnuOuHuXKzFOhgDDmS8JV2d08x.lx6PeLtm', NULL, 'uploads/profil/Cameron.jpg'),
(21, 'Millan', 'millan@gmail.com', '$2a$10$rHPyNpZlFzH7N.Hi1OWBXuewB/MEA1kLvMn9Kz50kic7cWYmzn4tW', 'Hey hey hey\r\n', '/Users/julescynamon/Desktop/GoupomaniaP7/frontend/public/uploads/profil/random-user.png'),
(27, 'test01', 'test01@gmail.com', '$2b$10$0eLVRr/y59k6StWAKi/vy.5JmRrGS30A2wLwo9EMRaJ9xrxvPq45W', NULL, NULL),
(28, 'test02', 'test02@gmail.com', '$2b$10$3fZd.1GPGVUdc8AdDPAWKub3HbIzf0.UJlUUJz.WpzSr0Uiv1Mezm', NULL, NULL),
(31, 'test03', 'test03@gmail.com', '$2b$10$fqWzB7wiaIG7Dh9G/Cg5ae3ARIDyh.TN/kRq9VliHX1sATO6LiLuu', NULL, NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`idCOM`),
  ADD KEY `idCreateur` (`idCreateur`),
  ADD KEY `idPublication` (`idPublication`);

--
-- Index pour la table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`idPOST`),
  ADD KEY `userId` (`userId`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`IdUSER`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `comment`
--
ALTER TABLE `comment`
  MODIFY `idCOM` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT pour la table `post`
--
ALTER TABLE `post`
  MODIFY `idPOST` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `IdUSER` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`idCreateur`) REFERENCES `user` (`IdUSER`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`idPublication`) REFERENCES `post` (`idPOST`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`IdUSER`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
