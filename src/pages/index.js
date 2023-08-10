import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}
    style={{ backgroundColor: '#6E6E6E' }}
    >
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div style={{ textAlign: 'center' }}>
          <a href="https://github.com/amichai-bd/fpga_mafia/actions/workflows/mafia_sanity.yml">
            <img src="https://github.com/amichai-bd/fpga_mafia/actions/workflows/mafia_sanity.yml/badge.svg" alt="mafia_sanity badge" />
          </a>
        </div>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div align = 'left'>
        <h3>Contributors:</h3>
        <a href="https://github.com/amichai-bd" target="_blank">Amichai Ben David</a>
        <br/>
        <a href="https://github.com/danielk532" target="_blank">Daniel Kaufman</a>
        <br/>
        <a href="https://github.com/noamsabb" target="_blank">Noam Sabban</a>
        <br/>
        <a href="https://github.com/ShmuelSfez" target="_blank">Shmuel Sfez</a>
        <br/>
        <a href="https://github.com/yeonatanPerelman" target="_blank">Yeonatan Perelman</a>
        </div>

          <div>
          <h3><strong>Current Development Status:</strong></h3>
          <p>
            This project is currently a work in progress (WIP).
            <br/> We are in the process of enabling
            and integrating individual IPs.
            <br/><br/>Our team is working diligently to deliver a fully functional fabric by August 1, 2023.
          </p>
        </div>
        </div>


        {/* <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div> */}
      </div>
    </header>
  );
}


export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <br/>
        <br/>
      <div className="container">
  <h2>Welcome to the MAFIA Project</h2>
  <p>
    A initiative aimed at designing a System-on-a-Chip (SoC) Tile-based mesh fabric.
    Our architecture is designed to be highly versatile, capable of incorporating a variety of functionalities.
  </p>

  <h2>Functionality includes</h2>
  <ul>
    <li>RISCV mini-cores and big-cores</li>
    <li>Hardware accelerators</li>
    <li>IO devices such as UART, keyboard, VGA, and DE10-Lite FPGA IO</li>
  </ul>

  <h2>Project Overview</h2>
  <p>
    The MAFIA Project is developed by final year Electrical and Computer Engineering students at Bar-Ilan University and the Technion in Israel.
  </p>

  <h2>Key Features</h2>
  <ul>
    <li>Acceleration of distributed workloads, particularly beneficial for AI inference and learning.</li>
    <li>Traditional program acceleration by utilizing a pipelining approach.</li>
    <li>This SoC design provides a robust platform for versatile tasks, offering improved speed and efficiency</li>
  </ul>

  <h3>Technology Stack</h3>
  <p>
    The project's RTL is written in SystemVerilog.
    We utilize the GNU GCC for the RISCV software stack, which includes linker, assembly, and C source files.
    Python is employed for build scripts, post-processing, GUI, and other utilities.
  </p>

  <h3>Main Components</h3>
  <p>
    Our architecture consists of the following key elements:
  </p>
  <ul>
    <li>A 4-way Router coupled with a local Endpoint.</li>
    <li>A 3-stage Mini Core that is RV32I compatible.</li>
    <li>A 7-stage Big Core, which is RV32IM CSR compatible and supports MMIO (VGA, UART, FPGA IO, PS2 Keyboard).</li>
    <li>A Memory Subsystem equipped with L1 Instruction and Data Cache, as well as a Memory Controller.</li>
  </ul>

  <h3>Software Stack to run on SoC</h3>
  <p>
    Our system runs on a simple proprietary RISCV embedded OS like system and includes:
  </p>
  <ul>
    <li>A software library for VGA graphical capabilities.</li>
    <li>A software library for accessing the FPGA MMIO and special control registers.</li>
    <li>Software examples demonstrating the utilization of many cores for distributed calculations and parallel computation.</li>
  </ul>

<br/>

  <div style={{ textAlign: 'center' }}>
    <img src="https://user-images.githubusercontent.com/81047407/218485725-d4442e94-7129-48b9-92bb-8f2ce52a301c.png" alt="Project Image" width="650" />
  </div>
<br/>

  <h2>Getting Started</h2>
  <p>
    For the best experience, we recommend using a Windows machine running vscode + gitbash.
    To see the build and run options, use the following command:
  </p>
  <pre><code>python build.py -h</code></pre>

  <h2>Prerequisite</h2>
  <p>
    Before you start, make sure you have the following tools and software installed:
  </p>
  <ul>
    <li><a href="https://github.com/xpack-dev-tools/riscv-none-embed-gcc-xpack/releases/">RISCV gcc releases</a> & <a href="https://xpack.github.io/riscv-none-embed-gcc/install/">install</a>, a Windows gcc for RISCV ISA.</li>
    <li><a href="https://www.intel.com/content/www/us/en/software-kit/660907/intel-quartus-prime-lite-edition-design-software-version-20-1-1-for-windows.html">Intel design SW for windows</a>, modelsim + quartus + MAX10 (de10-lite). used to compile, simulate & load to FPGA the HW systemverilog design.</li>
  </ul>

  <h3>Inspiration Behind the Project</h3>
  <p>
    This project draws inspiration from innovative players in the field of computing.
    These include:
  </p>
  <ul>
    <li><a href="https://www.bsg.ai/">HammerBlade Manycore:Bespoke Silicon Group</a> | <a href="https://www.youtube.com/watch?v=gTM7Tc5DCA8">Watch the video on Youtube</a></li>
    <li><a href="https://www.tesla.com/AI">Tesla: DOJO</a> | <a href="https://www.youtube.com/watch?v=DSw3IwsgNnc">Watch the video on Youtube</a></li>
    <li><a href="https://tenstorrent.com/">Tenstorrent: Wormhole & more</a> | <a href="https://www.youtube.com/watch?v=32CRYenTcdw">Watch the video on Youtube</a></li>
    <li><a href="https://www.esperanto.ai/">Esperanto: ET-SoC-1</a> | <a href="https://www.youtube.com/watch?v=5foT3huJ_Gg">Watch the video on Youtube</a></li>
  </ul>

  <h3>Troubleshooting Common Issues</h3>
  <p>
    'ModuleNotFoundError: No module named 'termcolor''
  </p>
  <pre><code>pip install termcolor</code></pre>

  <h3>Troubleshooting Common Issues</h3>
  <p>
    Issue: 'riscv-none-embed-gcc.exe' is not recognized as an internal or external command
  </p>
  <p>
    <strong>Solution:</strong> Add the following line to your ~/.bashrc file:
  </p>
  <pre><code>export PATH=$PATH:/c/Users/'user_name'/AppData/Roaming/xPacks/riscv-none-embed-gcc/xpack-riscv-none-embed-gcc-10.2.0-1.2/bin</code></pre>
  <p>
    Then, reload the bashrc file with this command:
  </p>
  <pre><code>source ~/.bashrc</code></pre>

  <h3>Quick Access Commands</h3>
  <p>
    For easy access, you can run the following commands in the GitBash shell for Windows:
  </p>
  <pre><code>./build.py -h</code></pre>
  <pre><code>./build.py -dut big_core -tests alive -app -hw -sim</code></pre>
  <pre><code>./build.py -dut cache -tests cache_alive -hw -sim -pp</code></pre>
  <pre><code>./build.py -dut sc_core -tests alive -full_run</code></pre>

  <h2>Stay Tuned for Updates!</h2>
  <p>Thank You for Your Interest in the MAFIA Project!</p>

      </div>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}


