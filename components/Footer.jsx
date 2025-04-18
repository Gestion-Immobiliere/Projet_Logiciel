import Link from "next/link";
import { MapPin, Mail, Phone, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#f9f5f0] to-[#e8d5b5] text-[#5d4a3a] pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary-600 text-white p-2 rounded-lg">
                <img src="/Dakar.png" alt="Logo" className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold">DakarImmo</span>
            </div>
            <p className="text-[#7a6652] leading-relaxed">
              Solution immobilière premium pour trouver ou proposer des biens d'exception à Dakar et ses environs.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-[#7a6652] hover:text-primary-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#7a6652] hover:text-primary-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#7a6652] hover:text-primary-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#7a6652] hover:text-primary-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-[#d4b78f] inline-block">Liens rapides</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/properties" className="flex items-center gap-2 text-[#7a6652] hover:text-primary-600 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-primary-600"></span>
                  Toutes les propriétés
                </Link>
              </li>
              <li>
                <Link href="/about" className="flex items-center gap-2 text-[#7a6652] hover:text-primary-600 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-primary-600"></span>
                  À propos de nous
                </Link>
              </li>
              <li>
                <Link href="/blog" className="flex items-center gap-2 text-[#7a6652] hover:text-primary-600 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-primary-600"></span>
                  Blog immobilier
                </Link>
              </li>
              <li>
                <Link href="/contact" className="flex items-center gap-2 text-[#7a6652] hover:text-primary-600 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-primary-600"></span>
                  Nous contacter
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-[#d4b78f] inline-block">Nos services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services/vente" className="flex items-center gap-2 text-[#7a6652] hover:text-primary-600 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-primary-600"></span>
                  Achat/Vente
                </Link>
              </li>
              <li>
                <Link href="/services/location" className="flex items-center gap-2 text-[#7a6652] hover:text-primary-600 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-primary-600"></span>
                  Location
                </Link>
              </li>
              <li>
                <Link href="/services/gestion" className="flex items-center gap-2 text-[#7a6652] hover:text-primary-600 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-primary-600"></span>
                  Gestion locative
                </Link>
              </li>
              <li>
                <Link href="/services/expertise" className="flex items-center gap-2 text-[#7a6652] hover:text-primary-600 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-primary-600"></span>
                  Expertise immobilière
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-[#d4b78f] inline-block">Contactez-nous</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-primary-600" />
                <span>33 Rue de la Corniche, Dakar, Sénégal</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary-600" />
                <a href="mailto:contact@dakarimmo.sn" className="hover:text-primary-600 transition-colors">
                  contact@dakarimmo.sn
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary-600" />
                <a href="tel:+221338209876" className="hover:text-primary-600 transition-colors">
                  +221 33 820 98 76
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary-600" />
                <span>Lun-Ven: 8h-18h</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#d4b78f] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#7a6652] text-sm">
            © {new Date().getFullYear()} DakarImmo. Tous droits réservés.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-[#7a6652] hover:text-primary-600 text-sm transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="/terms" className="text-[#7a6652] hover:text-primary-600 text-sm transition-colors">
              Conditions générales
            </Link>
            <Link href="/cookies" className="text-[#7a6652] hover:text-primary-600 text-sm transition-colors">
              Préférences cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}