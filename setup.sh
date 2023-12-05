curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
cargo install cargo-asm
cargo install iced-cpuid
#cross compliers
sudo apt install gcc-x86-64-linux-gnu
apt-get install -y build-essential
# this rust wasm32-wasi Bevcause i hate cpu shit
curl https://wasmtime.dev/install.sh -sSf | bash
#https://rust-book.cs.brown.edu/ch06-02-match.html
#https://github.com/bytecodealliance/wasmtime
# https://gist.github.com/jasonparekh/384a4def76fc751e9f5eda614b912783
npm i -g bun @swc/helpers @swc/jest as-bignum @swc/cli @swc/core @swc/types @types/node crypto-js iced-x86 typescript ts-node lua-in-js @swc/wasm hash-wasm
mkdir -p lib
cd lib
git clone https://github.com/icedland/iced-cpuid