import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-slate-50 px-8 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">iGuide</h3>
            <p className="text-sm text-slate-600">
              Creating innovative solutions for a better tomorrow.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-slate-600 hover:text-slate-900" />
              <Twitter className="h-5 w-5 text-slate-600 hover:text-slate-900" />
              <Instagram className="h-5 w-5 text-slate-600 hover:text-slate-900" />
              <Linkedin className="h-5 w-5 text-slate-600 hover:text-slate-900" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900">About Us</a></li>
              <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900">Services</a></li>
              <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900">Projects</a></li>
              <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900">Contact</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900">Blog</a></li>
              <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900">Documentation</a></li>
              <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900">Help Center</a></li>

              <NavLink to="/privacy-policy">
              <li>
                <a href="#" className="text-sm text-slate-600 hover:text-slate-900">Privacy Policy</a>
              </li>
              </NavLink>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-sm text-slate-600">
              Subscribe to our newsletter for the latest updates.
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="max-w-[200px]"
              />
              <Button variant="outline" size="default">
                <Mail className="mr-2 h-4 w-4" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Footer Bottom */}
        <div className="flex flex-col items-center justify-between space-y-4 text-sm text-slate-600 md:flex-row md:space-y-0">
          <p>© 2025 iGuide. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-900">Terms</a>
            <a href="#" className="hover:text-slate-900">Privacy</a>
            <a href="#" className="hover:text-slate-900">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
