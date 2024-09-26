import { mdiChevronUp, mdiCogOutline, mdiFileChartOutline, mdiFileTableOutline } from '@mdi/js';
import Icon from '@mdi/react';
import Link from 'next/link';
import { useState } from 'react';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  }

  return (
    <div className="w-64 bg-white text-black min-h-[80vh] h-full overflow-y-auto">
      <ul className='mt-10'>
        <li className="px-4 py-2 hover:bg-gray-300">
          <Link href="/dashboard"  className="flex items-center">
            <Icon className='mr-2' path={mdiFileChartOutline} size={1} color="black" />
            Dashboard
          </Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-300">
          <button className="flex items-center justify-between w-full" onClick={toggleExpand}>
            <div className="flex items-center">
              <Icon className="mr-2" path={mdiFileTableOutline} size={1} color="black" />
              Laporan Lalin
            </div>
            <Icon className={`ml-auto transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} path={mdiChevronUp } size={1} color="black" />
          </button>
          {isExpanded && (
            <ul className="pl-6 mt-2 space-y-1">
              <li className="px-4 py-2 hover:bg-gray-200">
                <Link href="/dashboard/harian">Laporan Per Hari</Link>
              </li>
            </ul>
          )}
        </li>
        <li className="px-4 py-2 hover:bg-gray-300">
          <Link href="/dashboard/master-gerbang" className="flex items-center">
            <Icon className='mr-2' path={mdiCogOutline} size={1} color="black" />
            Master Gerbang
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
