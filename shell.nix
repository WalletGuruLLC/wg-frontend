{ pkgs ? import <nixpkgs> { } }:

let
  lib = import <nixpkgs/lib>;
  buildNodeJs = pkgs.callPackage "${<nixpkgs>}/pkgs/development/web/nodejs/nodejs.nix" {
    python = pkgs.python3;
  };

  nodejsVersion = lib.fileContents ./.nvmrc;

  nodejs = buildNodeJs {
    enableNpm = false;
    version = nodejsVersion;
    sha256 = "sha256-D0p6BRw12V65BejLKqQ8XUArExIDkI/mM+s8+gUO+Qc=";
  };

  NPM_CONFIG_PREFIX = toString ./npm_config_prefix;

in
pkgs.mkShell {
  packages = with pkgs; [
    nodejs
    nodePackages.npm
  ];

  inherit NPM_CONFIG_PREFIX;

  shellHook = ''
    export PATH="${NPM_CONFIG_PREFIX}/bin:$PATH"
  '';
}
